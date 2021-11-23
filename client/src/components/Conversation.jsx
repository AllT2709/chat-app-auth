import React, { useEffect, useState } from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";

import { getUser } from "../services/user";

export default function Conversation({ conv, currentUser }) {
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const friendId = conv.members.find((m) => m !== currentUser.id);

    getUser(friendId)
      .then((currentFriend) => {
        setFriend(currentFriend.user);
      })
      .catch((err) => console.log(err));
  }, [conv, currentUser]);

  return (
    <ListItem button>
      <ListItemIcon>
        <Avatar
          alt="Alice"
          src="https://pbs.twimg.com/profile_images/1064544692707172354/LuZuUIkr_400x400.jpg"
        />
      </ListItemIcon>
      <ListItemText primary={friend?.username}></ListItemText>
    </ListItem>
  );
}
