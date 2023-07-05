import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import {Box} from "@mui/material";
import VISITER_ROUTES from './routes/userRoute'

// import Users from "./components/Users/index";
 import Login from "./components/Login/index";
// import Employee from "./components/Employee/index";
// import Product from "./components/Product/index";
import Loader from "./components/Common/Loader";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import DrawerHeader from './components/Common/Sidebar/DrawerHeader'


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
    return <Loader loading={loading} />;
  }

  return (
    <>
      {!hideNavbar && (
       
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              <Routes>
                {VISITER_ROUTES.map(({path,Component},index) => (
                <Route path={path} element={<Component/>} key={index} />

                ))}
              </Routes>
            </Box>
          </Box>
      )}
      {hideNavbar && (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
