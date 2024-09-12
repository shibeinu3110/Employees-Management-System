import React, { Component } from "react";
import { EgretHorizontalNav } from "egret";
import { navigations } from "../../navigations";
import { withStyles, MuiThemeProvider } from "@material-ui/core";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const ViewEgretHorizontalNav = withTranslation()(EgretHorizontalNav);
class Layout2Navbar extends Component {
  state = {};
  render() {
    let { theme, settings } = this.props;
    const navbarTheme =
      settings.themes[settings.layout2Settings.navbar.theme] || theme;
    return (
      <MuiThemeProvider theme={navbarTheme}>
        <Helmet>
          <style>
            {`.horizontal-nav a, 
              .horizontal-nav label {
                color: ${navbarTheme.palette.primary.contrastText};
              }
              .navbar,
              .horizontal-nav ul ul {
                background: ${navbarTheme.palette.primary.main};
              }
              .horizontal-nav ul li ul li:hover,
              .horizontal-nav ul li ul li.open {
                background: ${navbarTheme.palette.primary.dark};
              }
            `}
          </style>
        </Helmet>
        <div className="navbar">
          <div className="container">
            <ViewEgretHorizontalNav navigation={navigations} max={6} />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout2Navbar.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
  connect(
    mapStateToProps,
    {}
  )(Layout2Navbar)
);
