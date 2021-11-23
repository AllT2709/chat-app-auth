require("dotenv").config();
const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server: WebSocketServer } = require("socket.io");

const connection = require("./config/db");
const verify = require("./middlewares/verifyToken");
const { errorHandler, notFound } = require("./middlewares/errorHandler");
const userRouter = require("./src/routes/user.routes");
const conversationRouter = require("./src/routes/conversation.routes");
const messageRouter = require("./src/routes/messages.routes");
const privateRouter = require("./src/routes/private.routes");
const HandleUsers = require("./utils/handleUsers");

connection(process.env.MONGO_URI);
const app = express();
const server = http.createServer(app);
const io = new WebSocketServer(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

///VARIABLES////
app.set("port", process.env.PORT || 3000);
const users = new HandleUsers();

///MIDDLEWARES////
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  console.log("production activated");
  app.use(express.static(path.join(__dirname, "./public/dist")));
} else {
  app.use(express.static(path.join(__dirname, "../dist")));
}

///ROUTES///
app.use("/api", userRouter);
app.use("/api/conversations", verify, conversationRouter);
app.use("/api/messages", verify, messageRouter);
app.use("/api/users", verify, privateRouter);
////////////

app.use(errorHandler);
app.use(notFound);

io.on("connection", (socket) => {
  console.log("New connection: ", socket.id);

  socket.on("addUser", (userId) => {
    users.addUser(userId, socket.id);
  });

  socket.on("sendMessage", (data) => {
    const user = users.getUser(data.to);
    io.to(user.socketId).emit("getMessage", {
      data,
    });
  });

  socket.on("disconnect", () => {
    console.log("user diconnected");
    users.removeUser(socket.id);
  });
});

server.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
