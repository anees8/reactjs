import React from "react";
import {
  IconButton,
  Typography,
  List,
  Divider,
  Box,
  Toolbar,
  CssBaseline,
  Button,
  useTheme,

} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MenuItems from "./MenuItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import DrawerHeader from "./DrawerHeader";
import { Drawer, AppBar } from "./Drawer";
import { logoutApi } from "../../../api/UserApi";

const Sidebar = () => {
  const theme = useTheme();
  
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutApi(navigate));
  };

  const pages = [
    { id: 1, url: "/dashboard", name: "Dashboard", icon: <DashboardIcon /> },
    { id: 2, url: "/users", name: "Users", icon: <PersonIcon /> },
    { id: 3, url: "/employees", name: "Employees", icon: <BadgeOutlinedIcon /> },
    { id: 4, url: "/categories", name: "Categories", icon: <CategoryOutlinedIcon /> },
    { id: 5, url: "/products", name: "Products", icon: <StoreOutlinedIcon /> }
  ];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed"  open={open} sx={{backgroundColor: "#fff",color:"#1976d2" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" })
            }}
          >
            <MenuIcon />
          </IconButton>
          {!open &&
       
          <Typography variant="h6" noWrap component="div">
             <img  src="./logo/logo.png" width={180} />
          </Typography>
          }
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", md: "flex" },
              marginLeft: "auto"
            }}
          >
            <Button
              onClick={handleLogout}
              startIcon={<LogoutOutlinedIcon />}
              sx={{ my: 2, color: "#1976d2" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
     
      <Drawer   variant="permanent" open={open} >
     
        <DrawerHeader  onClick={handleDrawerClose}>
        {open &&
      
          <Box>
            <img src="./logo/logo.png" width={180} />
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
          </Box> }
        </DrawerHeader>
    
        <List>
          <Divider />
          {pages
            .sort((a, b) => a.id - b.id)
            .map((page) => (
              <MenuItems page={page} key={page.id} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
