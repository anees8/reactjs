import React, { useEffect, useState } from "react";
import Navbar from "./components/Common/Navbar";
import { Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Users from "./components/Users/index";
import Login from "./components/Login/index";
import Employee from "./components/Employee/index";
import Product from "./components/Product/index";
import { Backdrop, CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"]; // List of routes where the navbar should be hidden
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  const loading = useSelector((state) => state.login.loading);

  useEffect(() => {
    if (!storedToken && location.pathname !== "/") {
      navigate("/"); // Redirect to login page if token doesn't exist
    }
  }, [storedToken, location.pathname, navigate]);

  if (loading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#1976d2", zIndex: (theme) => theme.zIndex.drawer + 1 ,background: "rgba(25,118,210,0.1)" }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="employee" element={<Employee />} />
        <Route path="product" element={<Product />} />
      </Routes>
    </>
  );
};

export default App;
