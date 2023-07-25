// author Muhammad idrees

import React, { useState, startTransition, useEffect } from "react";
import { useDispatch } from "react-redux";
import { emailSignUp } from "../api/ApiFunctions";
import { useNavigate } from "react-router-dom";
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
  responsiveFontSizes,
} from "@mui/material";
import { LockOutlined as LockOutlinedIcon } from "@mui/icons-material";
import { setUserToken } from "../slices/userSlice";
import Loader from "./loader";

const SignUpForm = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    emailErr: "",
    passwordError: false,
    confirmPasswordError: false,
    matchError: "",
  });
  const { email, password, confirmPassword } = state;
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
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
    else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(state.password))
      setState({
        ...state,
        passwordError:
          "Password must be atleast 8 character, one Uppercase, one Lower case and digits",
      });
    else if (state.confirmPassword === "")
      setState({
        ...state,
        confirmPasswordError: true,
      });
    else if (state.password !== state.confirmPassword)
      setState({
        ...state,
        matchError: "Passwords do not match",
      });
    else {
      try {
        setIsLoading(true);

        const res = emailSignUp(email, password);
        // email
        // :
        // "eve.holt@reqres.in"
        // password
        // :
        // "pistol"
        res
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
      } catch (error) {
        setIsLoading(false);
        setApiError(error);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setApiError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [apiError]);

  const handleKeypress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const navigateToLogin = () => {
    startTransition(() => {
      navigate("/");
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
          Sign Up
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
          helperText={state.passwordError}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setState({ ...state, confirmPassword: e.target.value })
          }
          error={Boolean(state.confirmPasswordError)}
          helperText={state.confirmPasswordError || state.matchError}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? <Loader /> : "Sign Up"}
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link variant="body2" onClick={navigateToLogin}>
              Already have an account? Login
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

export default SignUpForm;
