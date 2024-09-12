import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  Grid,
  Card,
  IconButton,
  Icon,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Tooltip
} from "@material-ui/core";
import {
  Breadcrumb,
  SimpleCard,
  EgretProgressBar,
  EgretListItem1
} from "egret";
import EducationChart from "./EducationChart";

class LearningManagement extends Component {
  resultList = [
    {
      name: "React",
      date: "20 March",
      value: 50
    },
    {
      name: "Angular",
      date: "10 March",
      value: 85
    },
    {
      name: "Javascript",
      date: "20 March",
      value: 40
    },
    {
      name: "CSS",
      date: "30 March",
      value: 90
    },
    {
      name: "HTML",
      date: "10 March",
      value: 90
    }
  ];

  productList = [
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/logos/angular.png",
      name: "Angular Beyond the Basics",
      price: 100,
      available: 15
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/logos/react.png",
      name: "React Development Course",
      price: 150,
      available: 30
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/logos/webpack.png",
      name: "Webpack for Busy Developer",
      price: 190,
      available: 35
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/logos/sass.png",
      name: "Complete SASS course",
      price: 100,
      available: 0
    },
    {
      imgUrl: ConstantList.ROOT_PATH+"assets/images/logos/bootstrap.png",
      name: "Bootstrap for Everyone",
      price: 119,
      available: 5
    }
  ];

  state = {};
  render() {
    return (
      <div className="learning-management m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[
              { name: "Dashboard", path: "/dashboard" },
              { name: "Learning" }
            ]}
          />
        </div>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Card
              elevation={6}
              className="welcome-card bg-primary p-sm-24 mb-24  flex flex-space-between"
            >
              <div className="pr-16">
                <h4 className="font-size-22 font-weight-normal m-0 mb-8 text-white">
                  Welcome back! Watson
                </h4>
                <p className="m-0 text-muted-white">
                  You have completed <b>40%</b> of your goal this week! <br />
                  Start a new goal and improve your result
                </p>
              </div>
              <img
                src={ConstantList.ROOT_PATH+"assets/images/illustrations/designer.svg"}
                alt="designer"
              />
            </Card>

            <div className="mb-12">
              <Grid container spacing={3}>
                <Grid item md={5} xs={12}>
                  <SimpleCard title="Results">
                    <div style={{ marginTop: "-8px" }}>
                      {this.resultList.map(result => (
                        <div className="py-8" key={result.name}>
                          <Grid
                            key={result.name}
                            container
                            spacing={3}
                            alignItems="center"
                            className=""
                          >
                            <Grid item container spacing={2} xs={8}>
                              <Grid item className="flex">
                                <div
                                  className={`bg-${
                                    result.value < 51 ? "secondary" : "primary"
                                  } border-radius-circle`}
                                  style={{
                                    height: "10px",
                                    width: "10px",
                                    marginTop: "1px"
                                  }}
                                ></div>
                              </Grid>
                              <Grid item>
                                <h6 className="font-weight-normal m-0 text-body">
                                  {result.name}
                                </h6>
                                <small className="text-muted">
                                  {result.date}
                                </small>
                              </Grid>
                            </Grid>
                            <span className="mx-auto"></span>
                            <Grid item xs={4}>
                              <EgretProgressBar
                                value={result.value}
                                text={`${result.value}%`}
                                spacing={1}
                                color={`${
                                  result.value < 51 ? "secondary" : "primary"
                                }`}
                                coloredText={true}
                                className="pr-16"
                              ></EgretProgressBar>
                            </Grid>
                          </Grid>
                        </div>
                      ))}
                    </div>
                  </SimpleCard>
                </Grid>
                <Grid item md={7} xs={12}>
                  <SimpleCard title="Study time last week">
                    <EducationChart height="280px"></EducationChart>
                  </SimpleCard>
                </Grid>
              </Grid>
            </div>

            <div className="mb-24">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card className="play-card p-sm-24 bg-primary" elevation={6}>
                    <div className="flex flex-middle">
                      <div className="rectangle-box flex flex-center flex-middle">
                        <h5 className="font-weight-500 text-white m-0">C1</h5>
                      </div>
                      <div className="ml-12">
                        <small className="text-muted-white">
                          You watched today
                        </small>
                        <h6 className="m-0 mt-4 text-white font-weight-500">
                          Python 101
                        </h6>
                      </div>
                    </div>
                    <IconButton>
                      <Icon style={{ fontSize: "34px", color: "#fff" }}>
                        play_circle_outline
                      </Icon>
                    </IconButton>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card className="play-card p-sm-24 bg-error" elevation={6}>
                    <div className="flex flex-middle">
                      <div className="rectangle-box flex flex-center flex-middle">
                        <h5 className="font-weight-500 text-white m-0">C2</h5>
                      </div>
                      <div className="ml-12">
                        <small className="text-muted-white">
                          You watched today
                        </small>
                        <h6 className="m-0 mt-4 text-white font-weight-500">
                          Javascript 101
                        </h6>
                      </div>
                    </div>
                    <IconButton>
                      <Icon style={{ fontSize: "34px", color: "#fff" }}>
                        play_circle_outline
                      </Icon>
                    </IconButton>
                  </Card>
                </Grid>
              </Grid>
            </div>

            <Card elevation={6} className="">
              {/* <div className="card-title px-24 mb-8">Popular Courses</div> */}
              <div className="overflow-auto">
                <Table className="product-table">
                  <TableHead>
                    <TableRow>
                      <TableCell className="px-24" colSpan={4}>
                        Course
                      </TableCell>
                      <TableCell className="px-0" colSpan={2}>
                        Fee
                      </TableCell>
                      <TableCell className="px-0" colSpan={2}>
                        Enrolled
                      </TableCell>
                      <TableCell className="px-0" colSpan={1}>
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.productList.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="px-0 capitalize"
                          colSpan={4}
                          align="left"
                        >
                          <div className="flex flex-middle">
                            <img
                              className="circular-image-small"
                              src={product.imgUrl}
                              alt="user"
                            />
                            <p className="m-0 ml-8">{product.name}</p>
                          </div>
                        </TableCell>
                        <TableCell
                          className="px-0 capitalize"
                          align="left"
                          colSpan={2}
                        >
                          $
                          {product.price > 999
                            ? (product.price / 1000).toFixed(1) + "k"
                            : product.price}
                        </TableCell>

                        <TableCell className="px-0" align="left" colSpan={2}>
                          {product.available ? (
                            product.available < 20 ? (
                              <small className="border-radius-4 bg-secondary text-white px-8 py-2 ">
                                {product.available}
                              </small>
                            ) : (
                              <small className="border-radius-4 bg-primary text-white px-8 py-2 ">
                                {product.available}
                              </small>
                            )
                          ) : (
                            <small className="border-radius-4 bg-error text-white px-8 py-2 ">
                              {product.available}
                            </small>
                          )}
                        </TableCell>
                        <TableCell className="px-0" colSpan={1}>
                          <IconButton>
                            <Icon color="secondary">play_circle_filled</Icon>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card elevation={6} className="p-sm-24 h-100">
              <Card
                elevation={0}
                className="upgrade-card bg-light-primary p-sm-24 mb-36"
              >
                <img
                  src={ConstantList.ROOT_PATH+"assets/images/illustrations/upgrade.svg"}
                  alt="upgrade"
                />
                <p className="text-muted m-0 py-24">
                  Upgrade to <b>PRO</b> for <br /> more resources
                </p>
                <Button
                  className="uppercase"
                  size="large"
                  variant="contained"
                  color="primary"
                >
                  upgrade now
                </Button>
              </Card>

              <div className="mb-36">
                <h5 className="mb-16 font-size-14 font-weight-600 text-hint">
                  Achievements
                </h5>
                <div className="flex flex-middle">
                  <Tooltip title="Completed first course" placement="top">
                    <img
                      src={ConstantList.ROOT_PATH+"assets/images/badges/badge-1.svg"}
                      alt="badge"
                      height="24px"
                    />
                  </Tooltip>
                  <Tooltip title="Won a challenge" placement="top">
                    <img
                      className="mx-24"
                      src={ConstantList.ROOT_PATH+"assets/images/badges/badge-2.svg"}
                      alt="badge"
                      height="24px"
                    />
                  </Tooltip>
                  <Tooltip title="Won a competition" placement="top">
                    <img
                      src={ConstantList.ROOT_PATH+"assets/images/badges/badge-3.svg"}
                      alt="badge"
                      height="24px"
                    />
                  </Tooltip>
                </div>
              </div>

              <div className="mb-36">
                <h5 className="mb-8 font-size-14 font-weight-600 text-hint">
                  Reminder
                </h5>
                <EgretListItem1
                  title="Data structure test"
                  subtitle="23 December 2019"
                  bulletIcon="view_week"
                  actionIcon="play_circle_outline"
                  iconColor="primary"
                ></EgretListItem1>

                <EgretListItem1
                  title="Design pattern test"
                  subtitle="28 December 2019"
                  bulletIcon="library_books"
                  iconColor="primary"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>

                <EgretListItem1
                  title="Algorithm test"
                  subtitle="30 December 2019"
                  bulletIcon="games"
                  iconColor="primary"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>

                <EgretListItem1
                  title="Spanish 201"
                  subtitle="31 December 2019"
                  bulletIcon="textsms"
                  iconColor="primary"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>
              </div>

              <div className="">
                <h5 className="mb-8 font-size-14 font-weight-600 text-hint">
                  Upcoming Challenges
                </h5>
                <EgretListItem1
                  title="Create a simple webite"
                  subtitle="28 December 2019"
                  bulletIcon="web"
                  iconColor="error"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>

                <EgretListItem1
                  title="Simple TODO app"
                  subtitle="21 December 2019"
                  bulletIcon="list_alt"
                  iconColor="primary"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>

                <EgretListItem1
                  title="Invoice app"
                  subtitle="21 December 2019"
                  bulletIcon="description"
                  iconColor="secondary"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>

                <EgretListItem1
                  title="Order management app"
                  subtitle="21 December 2019"
                  bulletIcon="assignment_turned_in"
                  iconColor="primary"
                  actionIcon="play_circle_outline"
                ></EgretListItem1>
              </div>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default LearningManagement;
