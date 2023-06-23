import React, { useEffect,useState } from "react";
import Navbar from "./components/Common/Navbar";
import { Route, Routes, useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import Users from "./components/Users/index";
import Login from "./components/Login/index";
import Employee from "./components/Employee/index";
import Product from "./components/Product/index";
import { Container, CircularProgress } from "@mui/material";



const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/register"]; // List of routes where the navbar should be hidden
  const hideNavbar = hideNavbarRoutes.includes(location.pathname);
  const navigate = useNavigate();
  const storedToken = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true); // Loading state
  setTimeout(() => {
    setIsLoading(false);
    }, 500);

  useEffect(() => {
    if (!storedToken && location.pathname !== "/") {
      navigate("/"); // Redirect to login page if token doesn't exist
    }
  }, [storedToken, location.pathname, navigate]);

  if (isLoading) {
    return   <Container  sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}>
    <CircularProgress />
  </Container>; // Render a loading indicator while loading
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
