import React from 'react';
import { Grid, Card, Typography } from '@mui/material';

const CardItems = ({ cardItem }) => {
  const { qty,icon,title } = cardItem;

  return (
    <Grid item lg={3} sm={6} xs={12}>
      <Card sx={{ display: 'flex', borderRadius: '20px', padding: '0.6rem' }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          flexDirection={{ sm: 'row', md: 'column' }}
        >
          <Grid
            item
            sm={6}
            xs={12}
            textAlign="center"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: { xs: '0.4rem', sm: '0' },
            }}
          >
           {icon}
    
          </Grid>
          <Grid item sm={6} xs={12} textAlign="center">
            <Typography sx={{ fontSize: 'calc(1.275rem + .3vw)', fontWeight: 600 }} noWrap component="div">
              {qty}
            </Typography>
            <Typography
              color="textSecondary"
              noWrap
              component="div"
              sx={{ textTransform: 'uppercase', opacity: '0.75', fontWeight: 'bold' }}
            >
               {title}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default CardItems;
