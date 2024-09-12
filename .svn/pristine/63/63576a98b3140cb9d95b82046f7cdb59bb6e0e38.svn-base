import React, { Component, Fragment } from "react";

import { Hidden } from "@material-ui/core";
import AppContext from "app/appContext";
import Footer from "../SharedCompoents/Footer";
import Layout2Navbar from "./Layout2Navbar";
import Layout2Sidenav from "./Layout2Sidenav";
import Layout2Topbar from "./Layout2Topbar";
import { PropTypes } from "prop-types";
import Scrollbar from "react-perfect-scrollbar";
import SecondarySidebar from "../SharedCompoents/SecondarySidebar";
import { classList } from "utils";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { withStyles } from "@material-ui/styles";

const styles = theme => {
  return {
    layout: {
      backgroundColor: theme.palette.background.default,
      color: theme.palette.text.primary
    }
  };
};

class Layout2 extends Component {
  state = {};
  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    setLayoutSettings({
      ...settings,
      layout2Settings: {
        ...settings.layout2Settings,
        leftSidebar: {
          ...settings.layout2Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  render() {
    let { settings, classes, theme } = this.props;
    let { layout2Settings } = settings;

    // let layoutClasses = {
    //   [classes.layout]: true,
    //   [settings.activeLayout]: true,
    //   [`sidenav-${layout2Settings.leftSidebar.mode}`]: true,
    //   [`layout-${layout2Settings.mode} theme-${theme.palette.type}`]: true
    // };
    let layoutClasses = {
      [classes.layout]: true,
      [settings.activeLayout]: true,
      [`sidenav-${layout2Settings.leftSidebar.mode}`]: true,
      [`layout-${layout2Settings.mode}`]: true
    };
    return (
      <AppContext.Consumer>
        {({ routes }) => (
          <Fragment>
            <div className={classList(layoutClasses)}>
              {layout2Settings.topbar.show && <Layout2Topbar />}

              <Hidden smDown>
                {layout2Settings.navbar.show && <Layout2Navbar />}
              </Hidden>

              <Hidden mdUp>
                {layout2Settings.leftSidebar.show && <Layout2Sidenav />}
              </Hidden>

              {settings.perfectScrollbar && (
                // <Scrollbar
                //   options={{ suppressScrollX: true }}
                //   className="scrollable-content p-0"
                // >
                //   <div className="container p-0">{renderRoutes(routes)}</div>
                //   <div className="my-auto"></div>
                //   {settings.footer.show && !settings.footer.fixed && <Footer />}
                // </Scrollbar>
                <div
                  options={{ suppressScrollX: true }}
                  className="scrollable-content p-0"
                >
                  <div className="container p-0">{renderRoutes(routes)}</div>
                  <div className="my-auto"></div>
                  {settings.footer.show && !settings.footer.fixed && <Footer />}
                </div>                
              )}

              {!settings.perfectScrollbar && (
                <div
                  options={{ suppressScrollX: true }}
                  className="scrollable-content p-0"
                >
                  <div className="container p-0">{renderRoutes(routes)}</div>
                  <div className="my-auto"></div>
                  {settings.footer.show && !settings.footer.fixed && <Footer />}
                </div>
              )}

              {settings.footer.show && settings.footer.fixed && <Footer />}
            </div>
            {settings.secondarySidebar.show && <SecondarySidebar />}
          </Fragment>
        )}
      </AppContext.Consumer>
    );
  }
}

Layout2.propTypes = {
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { setLayoutSettings }
  )(Layout2)
);
