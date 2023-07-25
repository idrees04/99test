// src/App.js
import React, { lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Login = lazy(() => import("./components/LoginForm"));
const SiginUp = lazy(() => import("./components/SignUpForm"));
// const Home = lazy(() => import("./components/DataTable"));

const App = () => {
  return (
    <BrowserRouter>
            <ErrorBoundary>

      <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/siginUp" element={<SiginUp />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
      </ErrorBoundary>

    </BrowserRouter>
  );
};

export default App;
