import React from 'react';
import { Card, CardHeader, CardContent, Typography, Button, Grid ,CardActions} from '@mui/material';
import { Refresh} from '@mui/icons-material';
import SalesCharts from './SalesCharts';
import EarningCharts from './EarningCharts';

const DashboardChart = () => {
  return (
    <>
    <Grid item  sm={6} xs={12}>
      <Card variant="outlined" sx={{ borderRadius: '2rem'}}>
        <CardHeader 
          title={
            <Typography variant="h5" component="div">
      Sales{' '}
      <Typography variant="subtitle2" component="small" color="text.secondary">
        This week
      </Typography>
    </Typography>
          }
          action={
            <div>
              <Button variant="outlined" size="small" sx={{ marginRight: '0.5rem' }}>
                <Refresh />
              </Button> 
            </div>
          }
        />
        <CardContent  sx={{backgroundColor:"#f8f9f9",padding:0,margin:0} } >
          <SalesCharts/>
         
        </CardContent>
        <CardActions sx={{padding:3}}>
         
        </CardActions>
      </Card>
    </Grid>
     <Grid item  sm={6} xs={12}>
     <Card variant="outlined" sx={{ borderRadius: '2rem'}}>
       <CardHeader 
         title={
           <Typography variant="h5" component="div">
     Earnings{' ₹ '}
     <Typography variant="subtitle2" component="small" color="text.secondary">
       This week
     </Typography>
   </Typography>
         }
         action={
           <div>
             <Button variant="outlined" size="small" sx={{ marginRight: '0.5rem' }}>
               <Refresh />
             </Button> 
           </div>
         }
       />
       <CardContent  sx={{backgroundColor:"#f8f9f9",padding:0,margin:0} } >
         <EarningCharts/>
        
       </CardContent>
       <CardActions sx={{padding:3}}>
        
       </CardActions>
     </Card>
   </Grid>
   </>
  );
};

export default DashboardChart;
