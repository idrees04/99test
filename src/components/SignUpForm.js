// src/components/SignUpForm.js
// author Muhammad idrees
import React, { useState, startTransition, useEffect } from "react";
import { useDispatch } from "react-redux";
import { emailSignUp } from "../api/ApiFunctions";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Link } from "@mui/material";
import { setUserToken } from "../slices/userSlice";

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

        const res = await emailSignUp(email, password);
        console.log("res", res);
        if (res.data.access_token) {
          dispatch(setUserToken(res.data.access_token));
          setIsLoading(false);
          navigate("/");
        }
        //      handleUserRedirect(res.data, memId);
      } catch (error) {
        if (error.message === "Email already exists")
          console.log("error", error);
        setIsLoading(false);

        setApiError(error.message);
      }
    }
  };

  useEffect(() => {
   setTimeout(() => {
    setApiError("");
   }, 3000);
  }, [apiError])
  

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
    <div onKeyDown={handleKeypress}>
      <Typography variant="h5">Sign Up</Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setState({ ...state, email: e.target.value })}
        error={Boolean(state.emailErr)}
        helperText={state.emailErr }
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setState({ ...state, password: e.target.value })}
        error={Boolean(state.passwordError)}
        helperText={state.passwordError}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) =>
          setState({ ...state, confirmPassword: e.target.value })
        }
        error={Boolean(state.confirmPasswordError)}
        helperText={state.confirmPasswordError}
        fullWidth
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        color="primary"
        fullWidth
      >
        Sign Up
      </Button>
      <Typography>
        Already have an account?
        <Link onClick={navigateToLogin}>Login</Link>
      </Typography>
      <p>{apiError!==""? apiError:null}</p>
    </div>
  );
};

export default SignUpForm;
