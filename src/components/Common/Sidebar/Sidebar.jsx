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
  useTheme
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import MenuItems from "./MenuItems";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import DrawerHeader from "./DrawerHeader";
import { Drawer, AppBar } from "./Drawer";
import { logoutApi } from "../../../api/UserApi";

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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
    { id: 2, url: "/users", name: "Users", icon: <PersonIcon /> },
    { id: 1, url: "/employees", name: "Employees", icon: <BadgeOutlinedIcon /> },
    { id: 3, url: "/products", name: "Products", icon: <StoreOutlinedIcon /> }
  ];

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
          <Typography variant="h6" noWrap component="div">
            Colan Infotech
          </Typography>
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
              sx={{ my: 2, color: "white" }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader onClick={handleDrawerClose}>
          <IconButton>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          <Divider />
          {pages
            .sort((a, b) => a.id - b.id)
            .map((page) => (
              <MenuItems page={page} key={page.id} />
            ))}
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
