import React from "react";
import { Grid } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import CardItems from "./CardItems";

const DashboardCard = () => {
  const cardItemsData = [
    {
      id: 1,
      title: "Sales",
      qty: 1500,
      icon: (
        <ShoppingBagOutlinedIcon fontSize="large" sx={{ opacity: "0.50" }} />
      )
    },
    {
      id: 2,
      title: "earnings",
      qty: 1500,
      icon: (
        <AccountBalanceWalletOutlinedIcon
          fontSize="large"
          sx={{ opacity: "0.50" }}
        />
      )
    },

    {
      id: 3,
      title: "Today Orders",
      qty: 50,
      icon: (
        <AddShoppingCartOutlinedIcon
          fontSize="large"
          sx={{ opacity: "0.50" }}
        />
      )
    },
    {
      id: 4,
      title: "Active Users",
      qty: 100,
      icon: <PeopleAltOutlinedIcon fontSize="large" sx={{ opacity: "0.50" }} />
    }
  ];

  return (
    <Grid container spacing={2}>
      {cardItemsData
        .sort((a, b) => a.id - b.id)
        .map((cardItem) => (
          <CardItems cardItem={cardItem} key={cardItem.id} />
        ))}
    </Grid>
  );
};

export default DashboardCard;
