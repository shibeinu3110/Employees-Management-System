import React, { Component } from "react";
import { Breadcrumb, SimpleCard } from "egret";
import CircularProgressBar from "./CircularProgressBar";
import StackedPolarBar from "./StackedPolarBar";
import VictoryAreaAnimation from "./VictoryAreaAnimation";
import RadarChart from "./RadarChart";
import AlternativeEventsChart from "./AlternativeEvents";
import CustomTooltipLableChart from "./CustomTooltipLabelChart";

class AppVictoryChart extends Component {
  state = {};
  render() {
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Charts", path: "/charts" },
              { name: "Victory Charts" }
            ]}
          />
        </div>
        <SimpleCard title="circular progress bar">
          <CircularProgressBar />
        </SimpleCard>
        <div className="py-12" />
        <SimpleCard title="stacked polar bar">
          <StackedPolarBar />
        </SimpleCard>
        <div className="py-12" />
        <SimpleCard title="area animation Chart">
          <VictoryAreaAnimation />
        </SimpleCard>
        <div className="py-12" />
        <SimpleCard title="victory radar Chart">
          <RadarChart />
        </SimpleCard>
        <div className="py-12" />
        <SimpleCard title="alternative events Chart">
          <AlternativeEventsChart />
        </SimpleCard>
        <div className="py-12" />
        <SimpleCard title="custom tooltip label">
          <CustomTooltipLableChart />
        </SimpleCard>
      </div>
    );
  }
}

export default AppVictoryChart;
