import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@material-ui/core";

export default function Profile({ user }) {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar
            alt="User"
            src="https://pbs.twimg.com/profile_images/1064544692707172354/LuZuUIkr_400x400.jpg"
          />
        </ListItemIcon>
        <ListItemText primary={user?.username}></ListItemText>
      </ListItem>
    </List>
  );
}
