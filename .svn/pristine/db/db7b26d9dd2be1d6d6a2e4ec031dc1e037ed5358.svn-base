import React from "react";
import ConstantList from "../../appConfig";
import { Card, Icon, Fab, withStyles, Grid } from "@material-ui/core";

const styles = theme => ({
  root: {
    background: `url("/assets/images/dots.png"),
    linear-gradient(90deg, ${theme.palette.primary.main} -19.83%, ${theme.palette.primary.light} 189.85%)`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
  }
});

const numberStyle = { fontSize: "40px" };//, fontFamily: "Arial",  width: "100%"

const titleStyle = { fontSize: "20px"};// fontFamily: "Arial" 

const DashboardWelcomeCard = ({ classes, analytics, t, data }) => {
  return (
    <Grid container spacing={3}>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
        <a href = {ConstantList.ROOT_PATH+"register/eqa_health_org_round_register"} >
          <div className="font-weight-300 px-80 flex flex-center">
            <div className="text-white margin-auto" style={{ width: "100%" }}>
              <div style={numberStyle}>
                <b>{data.numberOfHealthOrgEQARound.toLocaleString("en-US")}</b>
              </div>
              <p className="m-0" style={titleStyle}>
                <b>{t("Analytics.registered_units")}</b>
              </p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <a href = {ConstantList.ROOT_PATH+"dashboard/eqaround"}>
          <div className="font-weight-300 px-80 flex flex-center">
            <div className="text-white margin-auto" style={{ width: "100%" }}>
              <div style={numberStyle}>
                <b>{data.numberOfEQARound.toLocaleString("en-US")}</b>
              </div>
              <p className="m-0" style={titleStyle}>
                <b>{t("Analytics.eqa_round_hosted")}</b>
              </p>
            </div>
          </div>
          </a>
        </Card>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <div className="font-weight-300 px-80 flex flex-center">
            <div className="text-white margin-auto" style={{ width: "100%" }}>
              <div style={numberStyle}>
                <b>{data.numberOfCorrectSampleTube.toLocaleString("en-US")}</b>
              </div>
              <p className="m-0" style={titleStyle}>
                <b>{t("Analytics.correct_sample")}</b>
              </p>
            </div>
          </div>
        </Card>
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card
          elevation={3}
          className={`p-16 py-28 text-center h-100 w-100 ${classes.root}`}
        >
          <div className="font-weight-300 px-80 flex flex-center">
            <div className="text-white margin-auto" style={{ width: "100%" }}>
              <div style={numberStyle}>
                <b>
                  {(
                    data.numberOfIncorrectSampleTube +
                    data.numberOfNotSubmittedSampleTube
                  ).toLocaleString("en-US")}
                </b>
              </div>
              <p className="m-0" style={titleStyle}>
                <b>{t("Analytics.incorrect_sample")}</b>
              </p>
            </div>
          </div>
        </Card>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { withTheme: true })(DashboardWelcomeCard);
