import React, { useState, useEffect, useRef } from "react";
import { Grid, ListItem, ListItemText, Typography } from "@material-ui/core";

import { format } from "timeago.js";

import { getUser } from "../services/user";

export default function Message({ message, user }) {
  const [friend, setFriend] = useState(null);
  const sender = message.from === user?.id;
  const friendId = sender ? message.to : message.from;
  const scrollRef = useRef();

  useEffect(() => {
    getUser(friendId)
      .then((currentFriend) => {
        setFriend(currentFriend.user);
      })
      .catch((err) => console.log(err));
  }, [message, user]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={scrollRef}>
      <ListItem>
        <Grid container>
          <Grid item xs={12}>
            <Typography align={sender ? "right" : "left"}>
              <strong>
                <i>{sender ? "Me" : friend?.username}</i>
              </strong>
            </Typography>
            <ListItemText
              align={sender ? "right" : "left"}
              primary={message.text}
            ></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText
              align={sender ? "right" : "left"}
              secondary={format(message.createdAt)}
            ></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
}
