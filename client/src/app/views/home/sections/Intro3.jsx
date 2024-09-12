import React, { Component } from "react";import {
  Icon,
  Grid,
  Fab
} from "@material-ui/core";
import ConstantList from "../../../appConfig";
import { getCurrentEQARound } from "./../HomeService";
import Moment from 'moment';
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";

class Intro3 extends Component {
  handleSignOut = () => {this.props.logoutUser();};
  constructor(props) {
    super(props);

    getCurrentEQARound().then((result) => {
      let currentEQARound = result.data;
      this.setState({ currentEQARound: currentEQARound });
    });
  }

  state = {
    currentEQARound: null
  };
  render() {
    const { t, i18n } = this.props;
    let {
      currentEQARound
    } = this.state;
    return (
      <section className="section section-intro1 section-intro3" id="intro3">
        <div className="container">
          <Grid container spacing={3} justify="center">
            {
              (currentEQARound && currentEQARound.id && currentEQARound.eqaPlanning)
                ?
                <Grid item md={6}>
                  <h1 className="section-intro1__title">
                    {t("landing_page.noti")} {currentEQARound.name}
                  </h1>
                  <div className="section-intro1__subtitle">
                    {t("landing_page.eqaPlanning")} {currentEQARound.eqaPlanning.name}
                  </div>

                  <div className="section-intro1__list">
                    <div className="section-intro1__list__item text-muted">
                      <Icon color="secondary">alarm_on</Icon> {t("landing_page.startDate")} {Moment(currentEQARound.startDate).format('DD/MM/YYYY')}
                    </div>
                    <div className="section-intro1__list__item text-muted">
                      <Icon color="secondary">alarm_off</Icon> {t("landing_page.endDate")} {Moment(currentEQARound.endDate).format('DD/MM/YYYY')}
                    </div>
                  </div>

                  <div>
                    <Fab
                      variant="extended"
                      size="large"
                      color="primary"
                      aria-label="Buy"
                      className="btn-action m-8"
                      href={ConstantList.ROOT_PATH + "session/signup-register-account"}
                    >
                      <Icon className="mr-16">person_add</Icon>
                      {t("sign_up.title")}
                    </Fab>

                    <Fab
                      variant="extended"
                      size="large"
                      color="primary"
                      aria-label="Buy"
                      className="btn-action m-8"
                      onClick={this.handleSignOut}
                    >
                      <Icon className="mr-16">person_pin</Icon>
                      {t("sign_in.title")}
                    </Fab>
                  </div>
                </Grid>
                :
                <Grid item md={6}>
                  <h1 className="section-intro1__title">
                  {t("landing_page.noti")} {t("landing_page.no_eqaRound")}
                </h1>
                  {/* <div className="subscribe-input">
                  <input
                    className="email-input"
                    type="text"
                    placeholder="Your email"
                  />
                  <Fab
                    variant="extended"
                    size="large"
                    color="secondary"
                    aria-label="Buy"
                    className="btn-action m-8"
                  >
                    <Icon className="mr-16">flight_takeoff</Icon>
                    Subscribe
                  </Fab>
                </div> */}
                </Grid>
            }
            <Grid item md={6}>
              <div className="intro3__product">
                <img src="./assets/images/illustrations/2.svg" alt="" />
              </div>
            </Grid>
          </Grid>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(Intro3);