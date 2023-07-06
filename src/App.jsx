import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import VISITER_ROUTES from './routes/userRoute';
import Login from "./components/Login/index";
import Custom404 from "./components/Common/Custom404";
import Loader from "./components/Common/Loader";
import Sidebar from "./components/Common/Sidebar/Sidebar";
import DrawerHeader from './components/Common/Sidebar/DrawerHeader';
import {
  setLoader,
} from "./store/slices/LoginSlice";

const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"]; // List of routes where the navbar should be hidden
  const hideNavbar = hideNavbarRoutes.includes(location.pathname) || !VISITER_ROUTES.some(({ path }) => path === location.pathname) ;
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  const loading = useSelector((state) => state.login.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoader(true));
    if (!storedToken && location.pathname !== "/") {
      
      navigate("/"); // Redirect to login page if token doesn't exist
    }
    setTimeout(() => {
      dispatch(setLoader(false));
      }, 200);
  }, [storedToken, location.pathname, navigate]);

    useEffect(() => {
    dispatch(setLoader(true));
    setTimeout(() => {
    dispatch(setLoader(false));
    }, 200);
    }, [dispatch]);
 

  return (
    <>
      {!hideNavbar && (
        <Box sx={{ display: "flex" }}>
          <Sidebar  />
        
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {loading ? (<Loader loading={loading} />):<>
            <DrawerHeader />
            <Routes>
              {VISITER_ROUTES.map(({ path, Component }, index) => (
                <Route path={path} element={<Component />} key={index} />
              ))}

            </Routes>
            </>}
          </Box>
         
        </Box>
      )}

    {hideNavbar && (
    <>
    {loading ? (<Loader loading={loading} />):
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="*" element={<Custom404 />} />
    </Routes>
    }
    </>
      )}
    </>
  );
};

export default App;
