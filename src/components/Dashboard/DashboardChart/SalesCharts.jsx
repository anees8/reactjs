import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Box} from '@mui/material';
const uData = [25, 31, 23, 38, 36, 40, 60];
const xLabels = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default function SalesChats() {
  const options = {
    tooltip: {
      enabled: true,
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
      series={[{ type: 'line',data: uData, area: true, color: '#89c4e2' }]}
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
