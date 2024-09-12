import React from "react";
import DoughnutChart from "./Doughnut";
import LineChart from "./LineChart";
import AreaChart from "./AreaChart";
import ComparisonChart from "./ComparisonChart";
import { Breadcrumb, SimpleCard } from "egret";
import { withStyles } from "@material-ui/styles";

const AppEchart = ({ theme }) => {
  return (
    <div className="m-sm-30">
      <div  className="mb-sm-30">
        <Breadcrumb
          routeSegments={[
            { name: "Charts", path: "/charts" },
            { name: "Echarts" }
          ]}
        />
      </div>
      <SimpleCard title="Doughnut Chart">
        <DoughnutChart
          height="350px"
          color={[
            theme.palette.primary.dark,
            theme.palette.primary.main,
            theme.palette.primary.light
          ]}
        />
      </SimpleCard>
      <div className="py-12" />
      <SimpleCard title="Line Chart">
        <LineChart
          height="350px"
          color={[theme.palette.primary.main, theme.palette.primary.light]}
        />
      </SimpleCard>
      <div className="py-12" />
      <SimpleCard title="Comparison Chart">
        <ComparisonChart
          height="350px"
          color={[
            theme.palette.primary.dark,
            // theme.palette.primary.main,
            theme.palette.primary.light
          ]}
        />
      </SimpleCard>
      <div className="py-12" />
      <SimpleCard title="Area Chart">
        <AreaChart height="350px" color={[theme.palette.primary.main]} />
      </SimpleCard>
    </div>
  );
};

export default withStyles({}, { withTheme: true })(AppEchart);
