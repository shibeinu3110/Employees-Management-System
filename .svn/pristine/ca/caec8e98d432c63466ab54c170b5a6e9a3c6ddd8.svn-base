import React, { Component, Fragment } from "react";
import {
  Grid,
  Card,
  Icon,
  IconButton,
  Button,
  Checkbox,
  Fab,
  Avatar,
  Hidden,
  TextField
} from "@material-ui/core";
import { Breadcrumb, SimpleCard, EgretProgressBar } from "egret";
import DashboardWelcomeCard from "../cards/DashboardWelcomeCard";
import DashboardWelcomeHealthOrgCard from "../cards/DashboardWelcomeHealthOrgCard";
import AreaChart from "../charts/echarts/AreaChart";
import { format } from "date-fns";
import ModifiedAreaChart from "./ModifiedAreaChart";
import { withStyles } from "@material-ui/styles";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import ConstantList from "../../appConfig";
import JwtAuthService from "../../services/jwtAuthService";
import { Helmet } from "react-helmet";
import ReactEcharts from "echarts-for-react";
import HomePage from "../HomePage/HomePage"; 

import {
  getCurrentUser,
  getEQARound,
  countNumberOfCorrectSampleTube,
  countNumberOfIncorrectSampleTube,
  countNumberOfNotSubmittedSampleTube,
  countNumberOfEQARound,
  countNumberOfHealthOrgEQARound,
  countNumberOfHealthOrgEQARoundByEQARound,
  countSampleTubeByEQARound
} from "./DashboardService";
import Autocomplete from "@material-ui/lab/Autocomplete";
//let isAdmin=false;
class Dashboard1 extends Component {
  state = {
    user: {},
    isAdmin: false,
    isHealthOrg: false,
    isUser: false,
    numberOfIncorrectSampleTube: 0,
    numberOfNotSubmittedSampleTube: 0,
    numberOfCorrectSampleTube: 0,
    numberOfHealthOrgEQARound: 0,
    numberOfEQARound: 0,
    eqaRoundList: [],
    selectedEQARound: {},
    barChartData: [],
    pieChartData: []
  };
  constructor(props) {
    super(props);
  }
  checkIsAdmin = ()=>{
    this.setState({isAdmin:false})
    if(this.state.user!=null && this.state.user.roles!=null && this.state.user.roles.length>0){
      this.state.user.roles.forEach(element => {
        if(element.name=='ROLE_ADMIN'){
          //isAdmin=true;
          this.setState({isAdmin:true})
          return true;
        }
      });
    }
  }
  getBarChartData = async () => {
    const barChartQueryResult = (
      await countNumberOfHealthOrgEQARoundByEQARound()
    ).data;
    let barChartData = [];
    for (const dto of barChartQueryResult) {
      barChartData.push([dto.round.name, dto.count]);
    }
    return barChartData;
  };

  getPieChartData = async roundId => {
    let pieChartData = [];
    try {
      const pieChartQueryResult = (await countSampleTubeByEQARound(roundId))
        .data;
      for (const [key, value] of Object.entries(pieChartQueryResult)) {
        switch (key) {
          case "correct":
            pieChartData.push({
              value,
              name: this.props.t("Analytics.correct")
            });
            break;
          case "incorrect":
            pieChartData.push({
              value,
              name: this.props.t("Analytics.incorrect")
            });
            break;
          case "notSubmitted":
            pieChartData.push({
              value,
              name: this.props.t("Analytics.not_submitted")
            });
            break;
          default:
            break;
        }
      }
    } catch (err) {
      pieChartData = [
        { value: 0, name: this.props.t("Analytics.correct") },
        { value: 0, name: this.props.t("Analytics.incorrect") },
        { value: 0, name: this.props.t("Analytics.not_submitted") }
      ];
    } finally {
      return pieChartData;
    }
  };

  handleSelectEQARound = async selectedEQARound => {
    const pieChartData = await this.getPieChartData(selectedEQARound.id);
    this.setState({
      pieChartData,
      selectedEQARound
    });
  };
 
  async componentWillMount() {
    let  user=JwtAuthService.getLoginUser();
    if (user != null && user.roles != null && user.roles.length > 0) {
 
      //this.setState({ isAdmin: false });    
      this.setState({
        isHealthOrg: false,
        isAdmin: false,
        isUser: false
      });      
      user.roles.forEach(role => {      
        //alert(role.name);      
        if (role.name == "ROLE_ADMIN") {
          this.setState({ isAdmin: true });
        } else if (role.name == "ROLE_HEALTH_ORG") {
          this.setState({ isHealthOrg: true });
        } else if (role.name == "ROLE_USER") {
          this.setState({ isUser: true });
        } 
      });
      
      // this.setState({ isAdmin: false });          
      // user.roles.forEach(role => {            
      //   if (role.name == "ROLE_ADMIN") {
      //     this.setState({ isAdmin: true });
      //   } else if (role.name == "ROLE_HEALTH_ORG") {
      //     this.setState({ isHealthOrg: true });
      //   } else if (role.name == "ROLE_USER") {
      //     this.setState({ isUser: true });
      //   } else {
      //     this.setState({
      //       isHealthOrg: false,
      //       isAdmin: false,
      //       isUser: false
      //     });
      //   }
      // });
    }

    // getCurrentUser().then(({ data }) => {
    //   this.setState({ user: data }, () => {
    //     let { user } = this.state;
    //     if (user != null && user.roles != null && user.roles.length > 0) {
    //       this.setState({ isAdmin: false });
    //       user.roles.forEach(role => {            
    //         if (role.name == "ROLE_ADMIN") {
    //           this.setState({ isAdmin: true });
    //         } else if (role.name == "ROLE_HEALTH_ORG") {
    //           this.setState({ isHealthOrg: true });
    //         } else if (role.name == "ROLE_USER") {
    //           this.setState({ isUser: true });
    //         } else {
    //           this.setState({
    //             isHealthOrg: false,
    //             isAdmin: false,
    //             isUser: false
    //           });
    //         }
    //       });
    //     }
    //   });
    // });

        //let { user } = localStorageService.getLoginUser();
    const numberOfCorrectSampleTube = (await countNumberOfCorrectSampleTube())
      .data;
    const numberOfIncorrectSampleTube = (
      await countNumberOfIncorrectSampleTube()
    ).data;
    const numberOfNotSubmittedSampleTube = (
      await countNumberOfNotSubmittedSampleTube()
    ).data;

    var numberOfHealthOrgEQARound = (await countNumberOfHealthOrgEQARound()).data;
    var numberOfEQARound = (await countNumberOfEQARound()).data;
    var eqaRoundList = (await getEQARound()).data.content;
    var selectedEQARound = await eqaRoundList[0];
    var barChartData = await this.getBarChartData();

    var pieChartData = null;
    if(selectedEQARound!=null)
      pieChartData= await this.getPieChartData(selectedEQARound.id);

    this.setState({
      numberOfCorrectSampleTube,
      numberOfIncorrectSampleTube,
      numberOfNotSubmittedSampleTube,
      numberOfHealthOrgEQARound,
      numberOfEQARound,
      eqaRoundList,
      selectedEQARound,
      barChartData,
      pieChartData
    });
  }

  render() {
    
    let { theme, t, i18n } = this.props;
    //this.checkIsAdmin();
    let isAdmin = this.state.isAdmin;
    const {
      numberOfEQARound,
      numberOfHealthOrgEQARound,
      numberOfIncorrectSampleTube,
      numberOfNotSubmittedSampleTube,
      numberOfCorrectSampleTube,
      eqaRoundList,
      selectedEQARound,
      barChartData,
      pieChartData
    } = this.state;
    const bigCardStyle = {
      height: "500px",
      padding: "10px",
      fontFamily: "Arial"
    };

    const barChartOptions = {
      title: {
        text: t("Analytics.registered_units"),  
        left: "center",
        fontFamily: "Arial"
      },
      color: ["#3398DB"],
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" }
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          axisTick: {
            alignWithLabel: false
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            show: true
          },
          name: t("Analytics.number_of_registered_units"),
          nameLocation: "end",
          nameTextStyle: {
            align: "left"
          }
        }
      ],
      series: [
        {
          name: t("Analytics.registered_units"),
          type: "bar",
          barWidth: "60%",
          data: barChartData,
          label: {
            show: true,
            position: "top"
          }
        }
      ]
    };

    const pieChartOptions = {
      title: {
        text: t("Analytics.eqa_round_result"),
        left: "center",
        fontFamily: "Arial"
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: [
          t("Analytics.correct"),
          t("Analytics.incorrect"),
          t("Analytics.not_submitted")
        ]
      },
      color: ["#229955", "#ff0000", "#9400ff"],
      series: [
        {
          name: t("Analytics.eqa_round_result"),
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: pieChartData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    };
    return (
      <div className="analytics m-sm-30">
        <div className="mb-sm-30">
          <Helmet>
            <title>
              {t("Dashboard.dashboard")} | {t("web_site")}
            </title>
          </Helmet>

          <div className="mb-sm-30">
            <Breadcrumb routeSegments={[{ name: t("Dashboard.dashboard") }]} />
          </div>
        </div>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} sm={12} xs={12}>   
          {/* {isAdmin &&
            <DashboardWelcomeCard
            t={t}
            data={{
              numberOfIncorrectSampleTube,
              numberOfNotSubmittedSampleTube,
              numberOfCorrectSampleTube,
              numberOfHealthOrgEQARound,
              numberOfEQARound
            }}
            >
            </DashboardWelcomeCard>
          } */}
          {/* {!isAdmin &&
          <DashboardWelcomeHealthOrgCard t={t}/>
          } */}
          
          {!isAdmin && (
            <HomePage t={t} />
          )}
            
          {/* </Grid>
          {isAdmin &&
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Card elevation={3} className="h-100" style={bigCardStyle}>
              
                <ReactEcharts
                  style={{ height: "500px",fontFamily: "Arial" }}
                  option={{
                    ...barChartOptions,
                    color: [theme.palette.primary.main]
                  }}
                />
              
            </Card>
          </Grid>
          } */}
          {/* {isAdmin &&
          <Grid item lg={6} md={6} sm={12} xs={12}>          
            <Card elevation={3} className="h-100" style={bigCardStyle}>
              <ReactEcharts
                style={{ height: "450px", fontFamily: "Arial" }}
                option={{
                  ...pieChartOptions
                }}
              />
              <Autocomplete
                id="combo-box-demo"
                options={eqaRoundList}
                getOptionLabel={option => option.code}
                style={{ width: "300px", margin: "auto" }}
                disableClearable
                size="small"
                value={selectedEQARound}
                onChange={(event, newValue) => {
                  this.handleSelectEQARound(newValue);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label={t("EQARound.title")}
                    variant="outlined"
                  />
                )}
              />
            </Card>
          
          </Grid>
          } */}
          {/* <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card elevation={3} className="h-100">
              <div className="px-24 pt-20">
                <div className="card-title">
                  {t("Analytics.register_units")}
                </div>
                {this.state.isAdmin && (
                  <Button className="mt-20" variant="contained" color="primary">
                    <a
                      href={
                        ConstantList.ROOT_PATH +
                        "register/eqa_health_org_round_register"
                      }
                    >
                      {t("Analytics.register")}
                    </a>
                  </Button>
                )}
                {this.state.isHealthOrg && (
                  <Button className="mt-20" variant="contained" color="primary">
                    <a
                      href={
                        ConstantList.ROOT_PATH +
                        "register/health_org_register_form"
                      }
                    >
                      {t("Analytics.register")}
                    </a>
                  </Button>
                )}
              </div>
              <AreaChart height="158px" color={[theme.palette.primary.main]} />
            </Card>
          </Grid>
          <Grid item lg={3} md={3} sm={12} xs={12}>
            <Card elevation={3} className="h-100">
              <div className="px-24 pt-20">
                <div className="card-title">{t("Analytics.sample_list")}</div>
                <Button
                  className="mt-20 text-white"
                  variant="contained"
                  color="secondary"
                >
                  <a href={ConstantList.ROOT_PATH + "sample/sample-list"}>
                    {t("Analytics.show")}
                  </a>
                </Button>
              </div>
              <AreaChart
                height="158px"
                color={[theme.palette.secondary.main]}
              />
            </Card>
          </Grid> */}

          {/* <Grid item lg={8} md={8} sm={12} xs={12}>
            <Grid container alignItems="center">
              <Grid item md={5} xs={7}>
                <div className="flex flex-middle px-4">
                  <Checkbox />
                  <span className="font-weight-500 text-muted ml-4">Name</span>
                </div>
              </Grid>

              <Grid item md={3} xs={4}>
                <span className="font-weight-500 text-muted">Date</span>
              </Grid>

              <Hidden smDown>
                <Grid item xs={4}>
                  <span className="font-weight-500 text-muted">Members</span>
                </Grid>
              </Hidden>
            </Grid>

            {[1, 2, 3, 4, 5].map(id => (
              <Fragment key={id}>
                <Card className="py-8 px-4 project-card">
                  <Grid container alignItems="center">
                    <Grid item md={5} xs={7}>
                      <div className="flex flex-middle">
                        <Checkbox />
                        <Hidden smDown>
                          {id % 2 === 1 ? (
                            <Fab
                              className="ml-4 bg-error box-shadow-none"
                              size="small"
                            >
                              <Icon>star_outline</Icon>
                            </Fab>
                          ) : (
                            <Fab
                              className="ml-4 bg-green box-shadow-none text-white"
                              size="small"
                            >
                              <Icon>date_range</Icon>
                            </Fab>
                          )}
                        </Hidden>
                        <span className="card__roject-name font-weight-500">
                          Project {id}
                        </span>
                      </div>
                    </Grid>

                    <Grid item md={3} xs={4}>
                      <div className="text-muted">
                        {format(new Date().getTime(), "MM/dd/yyyy hh:mma")}
                      </div>
                    </Grid>

                    <Hidden smDown>
                      <Grid item xs={3}>
                        <div className="flex position-relative face-group">
                          <Avatar
                            className="avatar"
                            src="/assets/images/face-4.jpg"
                          />
                          <Avatar
                            className="avatar"
                            src="/assets/images/face-4.jpg"
                          />
                          <Avatar
                            className="avatar"
                            src="/assets/images/face-4.jpg"
                          />
                          <Avatar className="number-avatar avatar">+3</Avatar>
                        </div>
                      </Grid>
                    </Hidden>

                    <Grid item xs={1}>
                      <div className="flex flex-end">
                        <IconButton>
                          <Icon>more_vert</Icon>
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
                <div className="py-8" />
              </Fragment>
            ))}

            <div className="pt-8">
              <SimpleCard title="sales">
                <ModifiedAreaChart
                  height="280px"
                  option={{
                    series: [
                      {
                        data: [34, 45, 31, 45, 31, 43, 26, 43, 31, 45, 33],
                        type: "line",
                        areaStyle: {},
                        smooth: true,
                        lineStyle: {
                          width: 3,
                          color: theme.palette.primary.main
                        }
                      }
                    ],
                    yAxis: {
                      axisLabel: {
                        color: theme.palette.text.secondary
                      }
                    },
                    color: [
                      {
                        type: "linear",
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                          {
                            offset: 0,
                            color: theme.palette.primary.light // color at 0% position
                          },
                          {
                            offset: 1,
                            color: "rgba(255,255,255,0)" // color at 100% position
                          }
                        ],
                        global: false // false by default
                      }
                    ]
                  }}
                ></ModifiedAreaChart>
              </SimpleCard>
            </div>
          </Grid> */}
          {/* <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card elevation={3} className="p-16">
              <div className="flex flex-middle">
                <Fab
                  size="medium"
                  className="bg-light-green circle-44 box-shadow-none"
                >
                  <Icon className="text-green">trending_up</Icon>
                </Fab>
                <h5 className="font-weight-500 text-green m-0 ml-12">
                  Active Users
                </h5>
              </div>
              <div className="pt-16 flex flex-middle">
                <h2 className="m-0 text-muted flex-grow-1">10.8k</h2>
                <div className="ml-12 small-circle bg-green text-white">
                  <Icon className="small-icon">expand_less</Icon>
                </div>
                <span className="font-size-13 text-green ml-4"> (+21%)</span>
              </div>
            </Card>

            <div className="py-8" />

            <Card elevation={3} className="p-16">
              <div className="flex flex-middle">
                <Fab
                  size="medium"
                  className="bg-light-error circle-44 box-shadow-none"
                >
                  <Icon className="text-error">star_outline</Icon>
                </Fab>
                <h5 className="font-weight-500 text-error m-0 ml-12">
                  Transactions
                </h5>
              </div>
              <div className="pt-16 flex flex-middle">
                <h2 className="m-0 text-muted flex-grow-1">$2.8M</h2>
                <div className="ml-12 small-circle bg-error text-white">
                  <Icon className="small-icon">expand_less</Icon>
                </div>
                <span className="font-size-13 text-error ml-4">(+21%)</span>
              </div>
            </Card>

            <div className="py-8" />

            <div>
              <SimpleCard title="Campaigns">
                <small className="text-muted">Today</small>
                <div className="pt-8" />
                <EgretProgressBar
                  value={75}
                  color="primary"
                  text="Google (102k)"
                />
                <div className="py-4" />
                <EgretProgressBar
                  value={45}
                  color="secondary"
                  text="Twitter (40k)"
                />
                <div className="py-4" />
                <EgretProgressBar
                  value={75}
                  color="primary"
                  text="Facebook (80k)"
                />

                <div className="py-12" />
                <small className="text-muted">Yesterday</small>
                <div className="pt-8" />
                <EgretProgressBar
                  value={75}
                  color="primary"
                  text="Google (102k)"
                />
                <div className="py-4" />
                <EgretProgressBar
                  value={45}
                  color="secondary"
                  text="Twitter (40k)"
                />
                <div className="py-4" />
                <EgretProgressBar
                  value={75}
                  color="primary"
                  text="Facebook (80k)"
                />

                <div className="py-12" />
                <small className="text-muted">Yesterday</small>
                <div className="pt-8" />
                <EgretProgressBar
                  value={75}
                  color="primary"
                  text="Google (102k)"
                />
                <div className="py-4" />
                <EgretProgressBar
                  value={45}
                  color="secondary"
                  text="Twitter (40k)"
                />
                <div className="py-4" />
                <EgretProgressBar
                  value={75}
                  color="primary"
                  text="Facebook (80k)"
                />
              </SimpleCard>
            </div>
          </Grid> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(Dashboard1);
