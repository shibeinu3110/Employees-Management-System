import React from "react";
import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";

const EducationChart = ({ height, color = [], theme }) => {
  const option = {
    barGap: 50,
    barMaxWidth: "6px",

    grid: {
      top: 24,
      left: 26,
      right: 26,
      bottom: 25
    },

    legend: {
      itemGap: 32,
      top: -4,
      left: -4,
      icon: "circle",
      width: "auto",
      data: ["Angular", "React", "Javascript"],
      textStyle: {
        color: theme.palette.text.secondary,
        fontSize: 12,
        fontFamily: "roboto",
        align: "center"
      }
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
        fontSize: 12,
        fontFamily: "roboto",
        margin: 16
      },
      axisTick: {
        show: false
      }
    },
    color: [
      theme.palette.primary.main,
      "#e95455",
      theme.palette.secondary.main
    ],
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
        name: "Angular",
        data: [50, 50, 80, 80, 80, 60, 70],
        type: "bar",
        itemStyle: {
          barBorderRadius: [0, 0, 10, 10]
        },
        stack: "one"
      },
      {
        name: "React",
        data: [70, 80, 90, 100, 70, 80, 65],
        type: "bar",
        stack: "one"
      },
      {
        name: "Javascript",
        data: [65, 80, 70, 100, 90, 70, 55],
        type: "bar",
        itemStyle: {
          barBorderRadius: [10, 10, 0, 0]
        },
        stack: "one"
      }
    ]
  };
  return (
    <ReactEcharts
      style={{ height: height }}
      option={{
        ...option
      }}
    />
  );
};

export default withStyles({}, { withTheme: true })(EducationChart);
