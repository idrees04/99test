// src/App.js
import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./ErrorBoundary";

const Login = lazy(() => import("./components/LoginForm"));
const SiginUp = lazy(() => import("./components/SignUpForm"));
const Home = lazy(() => import("./components/DataTable"));

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/siginUp" element={<SiginUp />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
