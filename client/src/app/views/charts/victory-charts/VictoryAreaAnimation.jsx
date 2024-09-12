import React from "react";
import * as _ from "lodash";
import {
  VictoryChart,
  VictoryTheme,
  VictoryStack,
  VictoryArea,
  VictoryContainer
} from "victory";

import { withStyles } from "@material-ui/styles";

class VictoryAreaAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.getData() };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({ data: this.getData() });
    }, 4000);
  }

  componentWillUnmount() {
    if (this.setStateInterval) clearInterval(this.setStateInterval);
  }

  getData() {
    return _.range(7).map(() => {
      return [
        { x: 1, y: _.random(1, 5) },
        { x: 2, y: _.random(1, 10) },
        { x: 3, y: _.random(2, 10) },
        { x: 4, y: _.random(2, 10) },
        { x: 5, y: _.random(2, 15) }
      ];
    });
  }

  render() {
    let { theme } = this.props;

    return (
      <div className="h-320">
        <VictoryChart
          width={700}
          containerComponent={<VictoryContainer responsive={true} />}
          theme={VictoryTheme.material}
          animate={{ duration: 1000 }}
          style={{
            label: { fontSize: 45, fill: theme.palette.text.secondary }
          }}
        >
          <VictoryStack colorScale={"blue"}>
            {this.state.data.map((data, i) => {
              return (
                <VictoryArea key={i} data={data} interpolation={"basis"} />
              );
            })}
          </VictoryStack>
        </VictoryChart>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(VictoryAreaAnimation);
