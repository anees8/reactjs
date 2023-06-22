import React, { useEffect } from "react";
import Navbar from "./components/Common/Navbar";
import { Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Users from "./components/Users/index";
import Login from "./components/Login/index";
import Employee from "./components/Employee";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"]; // List of routes where the navbar should be hidden
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (!storedToken && location.pathname !== "/") {
      navigate("/"); // Redirect to login page if token doesn't exist
    }
  }, [storedToken, location.pathname, navigate]);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="employee" element={<Employee />} />
      </Routes>
    </>
  );
};

export default App;
