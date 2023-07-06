import React from "react";
import { Container, Grid, Card, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const Dashboard = () => {
  return (
    <Container maxWidth="xxl">
      <Grid container spacing={2}>
        <Grid item lg={3}  sm={6} xs={12}>
          <Card sx={{ display: "flex" ,borderRadius: '20px', padding: "0.6rem",}} >
            <Grid container alignItems="center" justifyContent="center" flexDirection={{ sm: 'row', md: 'column' } }>
              <Grid item sm={6} xs={12} textAlign="center" >
                <ShoppingBagOutlinedIcon  fontSize="large" sx={{ opacity: "0.50" }} />
              </Grid>
              <Grid item sm={6} xs={12} textAlign="center" >
                <Typography sx={{ fontSize: "calc(1.275rem + .3vw)", fontWeight: 600 }} noWrap component="div">
                  1500
                </Typography>
                <Typography color="textSecondary" noWrap component="div" sx={{ textTransform: 'uppercase' }}>
                  Sales
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item lg={3}  sm={6} xs={12}>
          <Card sx={{ display: "flex",borderRadius: '20px', padding: "0.6rem"}}>
            <Grid container alignItems="center" justifyContent="center" flexDirection={{ xs: 'row', md: 'column' } }>
              <Grid item sm={6} xs={12} textAlign="center">
                <AccountBalanceWalletOutlinedIcon fontSize="large" sx={{ opacity: "0.50" }} />
              </Grid>
              <Grid item sm={6} xs={12} textAlign="center">
                <Typography sx={{ fontSize: "calc(1.275rem + .3vw)", fontWeight: 600 }} noWrap component="div">
                  780   
                </Typography>
                <Typography color="textSecondary" noWrap component="div" sx={{ textTransform: 'uppercase' }}>
                  earnings
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item lg={3}  sm={6} xs={12}>
          <Card sx={{ display: "flex",borderRadius: '20px', padding: "0.6rem"}}>
            <Grid container alignItems="center" justifyContent="center" flexDirection={{ sm: 'row', md: 'column' } }>
              <Grid item sm={6} xs={12} textAlign="center">
                <AddShoppingCartOutlinedIcon fontSize="large" sx={{ opacity: "0.50" }} />
              </Grid>
              <Grid item sm={6} xs={12} textAlign="center">
                <Typography sx={{ fontSize: "calc(1.275rem + .3vw)", fontWeight: 600 }} noWrap component="div">
                  1500
                </Typography>
                <Typography color="textSecondary" noWrap component="div" sx={{ textTransform: 'uppercase' }}>
                  Sales
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item lg={3}  sm={6} xs={12}>
          <Card sx={{ display: "flex",borderRadius: '20px', padding: "0.6rem"}}>
            <Grid container alignItems="center" justifyContent="center" flexDirection={{ sm: 'row', md: 'column' } }>
              <Grid item sm={6} xs={12} textAlign="center">
                <PeopleAltOutlinedIcon fontSize="large" sx={{ opacity: "0.50" }} />
              </Grid>
              <Grid item sm={6} xs={12} textAlign="center">
                <Typography sx={{ fontSize: "calc(1.275rem + .3vw)", fontWeight: 600 }} noWrap component="div">
                  5
                </Typography>
                <Typography color="textSecondary" noWrap component="div" sx={{ textTransform: 'uppercase' }}>
                  Today Orders
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        

      </Grid>
    </Container>
  );
};

export default Dashboard;
