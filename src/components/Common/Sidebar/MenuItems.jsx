import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Link } from "react-router-dom";

const MenuItems = ({ page, selectedIndex,setSelectedIndex }) => {
  const handleClick = () => {
    setSelectedIndex(page.id);
  };
  return (
    <Link style={{ textDecoration: "none",backgroundColor:"white", color: "black" }} to={`${page.url}`}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          selected={selectedIndex === page.id}
          onClick={handleClick} 
          sx={{
           
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5,          
          }}
        >
          <ListItemIcon
            sx={{
            
              color:"#1976d2",
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center"
            }}
          >
            {page.icon}
          </ListItemIcon>
          <ListItemText primary={page.name} sx={{  color:"#1976d2",opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default MenuItems;
