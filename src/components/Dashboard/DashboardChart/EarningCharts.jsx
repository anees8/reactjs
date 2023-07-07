import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box} from '@mui/material';
const uData = [119, 219, 235, 320, 360, 354, 390];
const xLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const formattedData = uData.map(value => `$${value}`);

export default function EarningCharts() {
  const options = {
    tooltip: {
      enabled: false,
    },
    scales: {
      x: {
        type: 'point',
        data: xLabels,
      },
      y: {
        min: 0,
      },
    },
  };

  return (
    <Box  sx={{width: "100%",height:"250px"}}>
    <LineChart 
     height={300}
      series={[{ type: 'line',data: uData,area: true, color: '#b6d28e' }]}
      xAxis={[{ scaleType: 'point', data: xLabels }]}
      options={options}
      sx={{
        padding:0,
        margin:0,
        width:"100%",

        '.MuiChartsAxis-line': {
          // display: 'none',
          padding: 0,
          margin: 0,
        },
        '.MuiChartsAxis-tickContainer': {
          // display: 'none',
          padding: 0,
          margin: 0,
        },
  
      }}
    />
    </Box>
  );
}
