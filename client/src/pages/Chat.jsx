import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Divider, TextField, List, Fab, Paper } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import ScrollBottom from "react-scroll-to-bottom";
import { connect, io } from "socket.io-client";

import Header from "../components/Header";
import User from "../components/Profile";
import Conversation from "../components/Conversation";
import Message from "../components/Message";

import { UserContext } from "../context/UserContext";
import { getConversations } from "../services/conversation";
import { getMessages, addMessages } from "../services/message";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "1px solid #e0e0e0",
  },
  messageArea: {
    height: "60vh",
    overflowY: "auto",
  },
});

let server =
  process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
let socket;
export default function Chat() {
  const classes = useStyles();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    socket = connect(server, { transports: ["websocket"] });
    socket.on("getMessage", (data) => {
      setArrivalMessage(data.data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      /* currentChat?.members.includes(arrivalMessage.from) && */
      setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    //if (user) {
    socket.emit("addUser", user?.id);
    getConversations(user?.id)
      .then((res) => {
        setConversations(res.conversations);
      })
      .catch((err) => console.log(err));
    //}
  }, [user?.id]);

  useEffect(() => {
    if (currentChat) {
      getMessages(currentChat._id)
        .then((res) => {
          setMessages(res.messages);
        })
        .catch((err) => console.log(err));
    }
  }, [currentChat]);

  const handleClick = (e) => {
    e.preventDefault();

    const receiverId = currentChat.members.find((m) => m !== user.id);

    const sendMessage = {
      conversation: currentChat._id,
      to: receiverId,
      from: user.id,
      text: newMessage,
    };

    socket.emit("sendMessage", {
      to: receiverId,
      from: user.id,
      text: newMessage,
      createdAt: Date.now(),
    });

    addMessages(sendMessage)
      .then((data) => {
        setMessages([...messages, data.message]);
        /* socket.emit("sendMessage", {
          to: data.message.to,
          from: data.message.from,
          text: data.message.text,
          createdAt: data.message.createdAt,
        }); */
      })
      .catch((err) => console.log(err));
    setNewMessage("");
  };

  return (
    <>
      <Header />
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <User user={user} />
          <Divider />
          <List>
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conv={c} currentUser={user} />
              </div>
            ))}
          </List>
        </Grid>
        <Grid item xs={9}>
          {currentChat ? (
            <>
              <ScrollBottom>
                <List className={classes.messageArea}>
                  {messages &&
                    messages.map((m, i) => (
                      <Message key={i} message={m} user={user} />
                    ))}
                </List>
              </ScrollBottom>
              <Divider />
              <Grid container style={{ padding: "20px" }}>
                <Grid item xs={11}>
                  <TextField
                    id="outlined-basic-email"
                    label="Type Something"
                    value={newMessage}
                    onChange={({ target }) => setNewMessage(target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={1} align="right">
                  <Fab color="primary" aria-label="add" onClick={handleClick}>
                    <Send />
                  </Fab>
                </Grid>
              </Grid>
            </>
          ) : (
            <div>
              <p>Click te user to chating!!</p>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
}
