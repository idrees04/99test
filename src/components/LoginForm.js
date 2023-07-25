// author Muhammad idrees

import React, { useState, startTransition, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserToken } from "../slices/userSlice";
import { handleEmailLogin } from "../api/ApiFunctions";
import {
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Paper,
  Avatar,
  CssBaseline,
  Container,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import Loader from "./loader";
const LoginForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    emailErr: "",
    passwordError: false,
  });

  const { email, password } = state;
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = useSelector((state) => state.user.token);
  useEffect(() => {
    setTimeout(() => {
      setApiError("");
    }, 5000);
  }, [apiError]);

  const handleLogin = async () => {
    if (state.email === "")
      setState({
        ...state,
        emailErr: "Email is Required",
      });
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(state.email))
      setState({
        ...state,
        emailErr: "Email is not valid",
      });
    else if (state.password === "")
      setState({
        ...state,
        passwordError: "Password is Required",
      });
    else if (state.password === "")
      setState({
        ...state,
        passwordError: true,
      });
    else {
      setIsLoading(true);

      const data = handleEmailLogin(email, password);
      console.log("resolvedData ", data); // This will log the resolved data (the object) to the console.

      data
        .then((resolvedData) => {
          console.log(resolvedData); // This will log the resolved data (the object) to the console.
          // Now you can perform further actions with the resolved data.
          if (resolvedData) {
            dispatch(setUserToken(resolvedData));

            setIsLoading(false);
          }
          navigate("/home");
        })
        .catch((error) => {
          // If the promise was rejected, you can handle the error here.
          console.error(error);
          setApiError(error.message || "Error occurred during login.");
          setIsLoading(false);
        });
    }
  };

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const navigateToLogin = () => {
    startTransition(() => {
      navigate("/siginUp");
    });
  };

  return (
    <Container onKeyDown={handleKeypress} component="main" maxWidth="xs">
      <CssBaseline />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          fullWidth
          value={email}
          onChange={(e) => setState({ ...state, email: e.target.value })}
          error={Boolean(state.emailErr)}
          helperText={state.emailErr}
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setState({ ...state, password: e.target.value })}
          error={Boolean(state.passwordError)}
          helperText={state.passwordError ? "Password is Required" : ""}
        />
        <Button
          onClick={handleLogin}
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <Loader /> : "Login"}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={navigateToLogin}>
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
        {apiError !== "" && (
          <Typography color="error" align="center">
            {apiError}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default LoginForm;
