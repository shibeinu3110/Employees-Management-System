import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";

const ProfileBarChart = ({ height, color, theme }) => {
  const option = {
    barGap: 50,
    barMaxWidth: "12px",
    grid: {
      top: 0,
      bottom: 25,
      show: false
    },
    legend: {
      show: false
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      showGrid: false,
      boundaryGap: false,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        color: theme.palette.text.secondary,
        fontSize: 14,
        fontFamily: "roboto"
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      show: false,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      }
    },
    series: [
      {
        data: [100, 100, 100, 100, 100, 100, 100],
        type: "bar",
        itemStyle: {
          color: "#E95455",
          barBorderRadius: 8
        }
      }
    ]
  };

  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option,
        color: [...color]
      }}
    />
  );
};

export default withStyles({}, { withTheme: true })(ProfileBarChart);
