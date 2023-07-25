// author Muhammad idrees

import React from "react";
import { Button, Typography, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CssBaseline, Container } from "@mui/material";
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
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Paper
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">Data Table</Typography>
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Replace the following table rows with your actual data */}
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>John Doe</TableCell>
                <TableCell>30</TableCell>
                <TableCell>john@example.com</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Jane Smith</TableCell>
                <TableCell>28</TableCell>
                <TableCell>jane@example.com</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          sx={{ mt: 3 }}
        >
          Logout
        </Button>
      </Paper>
    </Container>
  );
};

export default DataTable;
