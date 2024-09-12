import React, { Component } from "react";
import { Grid, Card, Icon, IconButton, Button } from "@material-ui/core";
import { Breadcrumb, SimpleCard } from "egret";
import DashboardWelcomeCard from "../cards/DashboardWelcomeCard";
import SimpleTable from "../material-kit/tables/SimpleTable";

import ReactEcharts from "echarts-for-react";
import { withStyles } from "@material-ui/styles";
import ConstantList from "../../appConfig";
class Analytics extends Component {
  state = {};

  recenBuyerList = [
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/face-1.jpg",
      name: "john doe",
      date: "18 january, 2019"
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/face-2.jpg",
      name: "kessy bryan",
      date: "10 january, 2019"
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/face-3.jpg",
      name: "james cassegne",
      date: "8 january, 2019"
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/face-4.jpg",
      name: "lucy brown",
      date: "1 january, 2019"
    }
  ];

  areaCommonOptions = {
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0
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
      show: false,
      type: "value",
      splitLine: {
        show: false
      }
    }
  };

  areaChart1Option = {
    series: [
      {
        data: [25, 18, 20, 30, 40, 43],
        type: "line",
        areaStyle: {},
        smooth: true
      }
    ]
  };

  areaChart2Option = {
    series: [
      {
        data: [15, 20, 20, 19, 20, 28],
        type: "line",
        areaStyle: {},
        smooth: true
      }
    ]
  };

  lineChartOption = {
    grid: {
      top: "10%",
      bottom: "10%",
      left: "5%",
      right: "5%"
    },
    legend: {
      show: false,
      itemGap: 20,
      icon: "circle"
    },
    tooltip: {},
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false
      }
    },
    series: [
      {
        data: [30, 40, 20, 50, 40, 80, 90],
        type: "line",
        stack: "This month",
        name: "This month",
        smooth: true,
        symbolSize: 4,
        lineStyle: {
          width: 4
        }
      },
      {
        data: [20, 50, 15, 50, 30, 70, 95],
        type: "line",
        stack: "Last month",
        name: "Last month",
        smooth: true,
        symbolSize: 4,
        lineStyle: {
          width: 4
        }
      }
    ]
  };

  render() {
    let { theme } = this.props;
    // console.log(theme)
    return (
      <div className="analytics m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Analytics" }
            ]}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <DashboardWelcomeCard />
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card elevation={3} className="h-100">
              <div className="px-24 pt-20">
                <div className="card-title">total revenue</div>
                <div className="card-subtitle mb-24">$10345</div>
                <Button variant="contained" color="primary">
                  + 180 sales
                </Button>
              </div>
              <ReactEcharts
                style={{ height: "158px" }}
                option={{
                  ...this.areaCommonOptions,
                  ...this.areaChart1Option,
                  color: [theme.palette.primary.main]
                }}
              />
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card elevation={3} className="h-100">
              <div className="px-24 pt-20">
                <div className="card-title">todays traffic</div>
                <div className="card-subtitle mb-24">500</div>
                <Button
                  className="text-white"
                  variant="contained"
                  color="secondary"
                >
                  + 300 new
                </Button>
              </div>
              <ReactEcharts
                style={{ height: "158px" }}
                option={{
                  ...this.areaCommonOptions,
                  ...this.areaChart2Option,
                  color: [theme.palette.secondary.main]
                }}
              />
            </Card>
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <SimpleCard title="sales">
              <div className="flex py-20">
                <div>
                  <p className="m-0 mb-4 text-muted capitalize">this month</p>
                  <h3 className="m-0 text-secondary font-weight-600">$180</h3>
                </div>
                <div className="ml-30">
                  <p className="m-0 mb-4 text-muted capitalize">last month</p>
                  <h3 className="m-0 font-weight-600">$160</h3>
                </div>
              </div>
              <ReactEcharts
                style={{ height: "250px" }}
                option={{
                  ...this.lineChartOption,
                  color: [
                    theme.palette.primary.main,
                    theme.palette.primary.light
                  ]
                }}
              />
            </SimpleCard>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <SimpleCard title="top selling products" subtitle="Updated Today">
              <div className="mt-24">
                {this.recenBuyerList.map((buyer, index) => (
                  <div
                    className="flex flex-middle flex-space-between py-8"
                    key={index}
                  >
                    <div className="flex flex-middle">
                      <img
                        className="circular-image-small"
                        src={buyer.imgUrl}
                        alt="user"
                      />
                      <div className="pl-8 capitalize">
                        <p className="m-0">{buyer.name}</p>
                        <p className="m-0">{buyer.date}</p>
                      </div>
                    </div>
                    <IconButton>
                      <Icon color="primary">more_vert</Icon>
                    </IconButton>
                  </div>
                ))}
              </div>
            </SimpleCard>
          </Grid>

          <Grid item lg={12} md={12} sm={12} xs={12}>
            <SimpleCard title="subscriber list">
              <SimpleTable />
            </SimpleCard>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles({}, { withTheme: true })(Analytics);
