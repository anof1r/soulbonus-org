import React from "react";
import Chart from "react-apexcharts";
import { Box } from "@chakra-ui/react";

export default function DonutChart() {
  const series = [70, 30];
  const options = {
    chart: {
      type: "donut",
      },
      dataLabels: {
        enabled: false
      },  
    labels: ["Burned", "Active"],
  };
  return (
    <Box mt="1em" borderRadius="20px" bg="white">
      <Chart options={options} type="donut" series={series} width="100%" />
    </Box>
  );
}
