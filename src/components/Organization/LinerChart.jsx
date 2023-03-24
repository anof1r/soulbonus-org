import React from "react";
import Chart from "react-apexcharts";
import {
	Box,
} from '@chakra-ui/react'

export default function LinerChart() {
  const series = [
    {
      name: "Gold", 
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
    },{
      name: "Silver", 
      data: [1, 5, 12, 3, 9, 15, 21, 22, 50],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false,
      },
    },
    colors:['#7B68EE', '#9400D3', ],
    stroke: {
      curve: "straight",
    },
    dataLabels: {
      enabled: false
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ], //will be displayed on the x-asis
    },
  };
  return (
    
    <Box mt='1em' borderRadius='20px' bg='white'>
      <Chart options={options} type="area" series={series} width="100%" />
    </Box>
  );
}
