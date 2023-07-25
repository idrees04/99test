// src/components/DataTable.js
// author Muhammad idrees

import React from "react";
import { Button, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUserToken } from "../slices/userSlice";

const DataTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Implement the logout functionality here.
    // For example, clear the user token from localStorage and navigate to the login page.
    dispatch(clearUserToken());
    navigate("/");
  };

  return (
    <div>
      <Typography variant="h5">Data Table</Typography>
      {/* Implement your data table here if you have one. */}
      <Button onClick={handleLogout} variant="contained" color="secondary">
        Logout
      </Button>
    </div>
  );
};

export default DataTable;
