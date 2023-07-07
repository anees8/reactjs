import React from "react";
import {Container,Box,Grid} from "@mui/material";
import DashboardCard from "./DashboardCard/index";
import DashboardChart from "./DashboardChart/index";

const Dashboard = () => {
  return (
      <Container maxWidth="xxl">
      <Box sx={{marginBottom:"40px"}}>
      <DashboardCard />  
      </Box> 
      <Box sx={{marginBottom:"40px"}}>   
      <Grid container spacing={2}>
      <DashboardChart/>
      </Grid>
      </Box>
      </Container>

  );
};

export default Dashboard;
