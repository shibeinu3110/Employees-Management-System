import React, { Component } from "react";

import {
  XAxis,
  FlexibleWidthXYPlot,
  YAxis,
  // HorizontalGridLines,
  // VerticalGridLines,
  LineSeries
} from "react-vis";
import { withStyles } from "@material-ui/core";

class ColoredLineChart extends Component {
  state = {
    data: []
  };

  loadData = () => {
    let temp = [];
    for (let i = 0; i < 20; i++) {
      const series = [];
      for (let j = 0; j < 100; j++) {
        series.push({
          x: j,
          y: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)
        });
      }
      temp.push({ color: i, key: i, data: series, opacity: 0.8 });
    }

    this.setState({
      data: [...temp]
    });
  };

  componentWillMount() {
    this.loadData();
  }

  render() {
    let { data } = this.state;
    let { theme } = this.props;
    return (
      <FlexibleWidthXYPlot
        height={320}
        colorType="linear"
        colorDomain={[0, 9]}
        colorRange={["yellow", "orange"]}
      >
        {/* <HorizontalGridLines /> */}
        {/* <VerticalGridLines /> */}
        <XAxis
          style={{
            text: {
              stroke: "none",
              fill: theme.palette.text.secondary,
              fontWeight: 600
            }
          }}
        />
        <YAxis
          style={{
            text: {
              stroke: "none",
              fill: theme.palette.text.secondary,
              fontWeight: 600
            }
          }}
        />
        {data.map(props => (
          <LineSeries {...props} />
        ))}
      </FlexibleWidthXYPlot>
    );
  }
}

export default withStyles({}, { withTheme: true })(ColoredLineChart);
