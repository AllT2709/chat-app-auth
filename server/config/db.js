const mongoose = require("mongoose");

const connection = (URL) => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch((err) => console.log(err));
};

module.exports = connection;
