import React, { Component } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import { withStyles } from "@material-ui/core";

class CircularProgressBar extends Component {
  state = {
    percent: 0,
    data: this.getData(0)
  };

  componentDidMount() {
    let percent = 0;
    this.setStateInterval = window.setInterval(() => {
      percent += 25;
      percent = percent > 100 ? 0 : percent;
      this.setState({
        percent,
        data: this.getData(percent)
      });
    }, 2000);
  }

  componentWillUnmount() {
    if (this.setInterval) window.clearInterval(this.setStateInterval);
  }

  getData(percent) {
    return [{ x: 1, y: percent }, { x: 2, y: 100 - percent }];
  }

  render() {
    let { theme } = this.props;

    return (
      <div style={{ height: "320px" }}>
        <svg viewBox="0 0 400 400" width="100%" height="100%">
          <VictoryPie
            standalone={false}
            animate={{ duration: 1000 }}
            width={400}
            height={400}
            data={this.state.data}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: d => {
                  const color = d.y > 30 ? "green" : "red";
                  return d.x === 1 ? color : "transparent";
                }
              }
            }}
          />
          <VictoryAnimation duration={1000} data={this.state}>
            {newProps => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${Math.round(newProps.percent)}%`}
                  style={{ fontSize: 45, fill: theme.palette.text.secondary }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(CircularProgressBar);
