import React, { useContext } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { logout } from "../context/UserAction";

import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  userDropdown: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(1),
  },
}));

export default function Header2() {
  const classes = useStyles();
  const { dispatch } = useContext(UserContext);
  return (
    <Grid container>
      <Grid item xs={10}>
        <Typography variant="h5" className="header-message">
          Chat app
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          className={classes.userDropdown}
          onClick={() => logout(dispatch)}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}
