import React from "react";
import ReactEcharts from "echarts-for-react";
import { merge } from "lodash";

const defaultOption = {
  grid: {
    top: 16,
    left: 24,
    right: 0,
    bottom: 24
  },
  legend: {},
  tooltip: {},
  xAxis: {
    show: false,
    type: "category",
    showGrid: false,
    boundaryGap: false
  },
  yAxis: {
    type: "value",
    min: 10,
    max: 60,
    splitLine: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: "rgba(0,0,0,0.54)",
      fontSize: 13,
      fontFamily: "roboto",
    }
  }
};

const ModifiedAreaChart = ({ height, option }) => {
  return (
    <ReactEcharts
      style={{ height: height }}
      option={merge({}, defaultOption, option)}
    />
  );
};

export default ModifiedAreaChart;
