// src/components/LoginForm.js

import React, { useState, startTransition } from "react";
import { handleEmailLogin } from "../api/ApiFunctions";
import { TextField, Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
      try {
        setIsLoading(true);

        const data = handleEmailLogin(email, password);
        data
          .then((resolvedData) => {
            console.log(resolvedData); // This will log the resolved data (the object) to the console.
            // Now you can perform further actions with the resolved data.
            localStorage.setItem("userToken", resolvedData.access_token);
            if (resolvedData.access_token) {
              setIsLoading(false);
            }
            navigate("/");
          })
          .catch((error) => {
            // If the promise was rejected, you can handle the error here.
            console.error("Error occurred:", error);
          });
      } catch (error) {
        console.log("error", error);
        setApiError(error.message);
      }
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
    <div onKeyDown={handleKeypress}>
      <Typography variant="h5">Login</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
        error={Boolean(state.emailErr)}
        helperText={state.emailErr}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
        error={Boolean(state.passwordError)}
        helperText={state.passwordError ? "Password is Required" : ""}
        fullWidth
      />
      <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
        Login
      </Button>
      <Typography>
        Don't have an account?{" "}
        <Link onClick={navigateToLogin}>Sign Up</Link>
      </Typography>
    </div>
  );
};

export default LoginForm;
