import React, { useState, useContext } from "react";
import { Button, Grid, Link, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
/* import { Link } from "react-router-dom"; */

import { loginStart, loginSuccess } from "../context/UserAction";
import { UserContext } from "../context/UserContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(UserContext);
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginStart(dispatch);
    const user = {
      email,
      password,
    };
    loginSuccess(user, dispatch);
  };

  return (
    <div className={classes.paper}>
      <Grid container justifyContent="center">
        <Grid item>
          <Typography component="h1" variant="h5" align="center">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              className={classes.textField}
              label="Email"
              fullWidth={true}
              variant="outlined"
              margin="normal"
              required={true}
              onChange={({ target }) => setEmail(target.value)}
            />
            <TextField
              className={classes.textField}
              type="password"
              label="Password"
              fullWidth={true}
              variant="outlined"
              margin="normal"
              required={true}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button
              type="submit"
              fullWidth={true}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
          </form>
          <Grid item xs={9}>
            <Typography>
              <Link href="#">Don't have an account?</Link>
              {/* <Link to="#">Don't have an account?</Link> */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
