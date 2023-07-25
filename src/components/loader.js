import React from "react";
import { CircularProgress } from "@mui/material";

const loaderContainerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const loaderStyle = {
  animation: "spin 1s ease-in-out infinite",
};

const Loader = () => {
  return (
    <div style={loaderContainerStyle}>
      <CircularProgress style={loaderStyle} color="primary" />
    </div>
  );
};

export default Loader;
