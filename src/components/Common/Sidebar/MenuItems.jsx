import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { Link } from "react-router-dom";

const MenuItems = ({ page, selectedIndex }) => {
  return (
    <Link style={{ textDecoration: "none", color: "black" }} to={`${page.url}`}>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton
          selected={selectedIndex === page.id}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            px: 2.5
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : "auto",
              justifyContent: "center"
            }}
          >
            {page.icon}
          </ListItemIcon>
          <ListItemText primary={page.name} sx={{ opacity: open ? 1 : 0 }} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default MenuItems;
