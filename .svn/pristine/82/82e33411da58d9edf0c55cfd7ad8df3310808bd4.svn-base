import React, { Component } from "react";
import { VictoryChart, Bar, VictoryBar } from "victory";

class AlternativeEventsChart extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      style: {
        data: { fill: "tomato" }
      }
    };
  }

  render() {
    const handleMouseOver = () => {
      const fillColor = this.state.clicked ? "blue" : "tomato";
      const clicked = !this.state.clicked;
      this.setState({
        clicked,
        style: {
          data: { fill: fillColor }
        }
      });
    };

    return (
      <div className="h-320">
        <VictoryChart
          domainPadding={{ x: 50, y: [0, 20] }}
          scale={{ x: "time" }}
        >
          <VictoryBar
            dataComponent={<Bar events={{ onMouseOver: handleMouseOver }} />}
            style={this.state.style}
            data={[
              { x: new Date(1986, 1, 1), y: 2 },
              { x: new Date(1996, 1, 1), y: 3 },
              { x: new Date(2006, 1, 1), y: 5 },
              { x: new Date(2016, 1, 1), y: 4 }
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default AlternativeEventsChart;
