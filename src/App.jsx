import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import VISITER_ROUTES from './routes/userRoute';
import Login from "./components/Login/index";
import Custom404 from "./components/Common/Custom404";

import Loader from "./components/Common/Loader";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import DrawerHeader from './components/Common/Sidebar/DrawerHeader';

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"]; // List of routes where the navbar should be hidden
  const hideNavbar = hideNavbarRoutes.includes(location.pathname) || !VISITER_ROUTES.some(({ path }) => path === location.pathname) ;
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
          <Sidebar  />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Routes>
              {VISITER_ROUTES.map(({ path, Component }, index) => (
                <Route path={path} element={<Component />} key={index} />
              ))}

            </Routes>
          </Box>
        </Box>
      )}

      {hideNavbar && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="*" element={<Custom404 />} />
        </Routes>
      )}
    </>
  );
};

export default App;
