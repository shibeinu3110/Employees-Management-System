import React, { Component, Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { navigations } from "../../navigations";
import { EgretVerticalNav } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import JwtAuthService from "../../services/jwtAuthService";
import localStorageService from "../../services/localStorageService";
const ViewEgretVerticalNav = withTranslation()(EgretVerticalNav);
class Sidenav extends Component {
  state = {};
  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    let activeLayoutSettingsName = settings.activeLayout+"Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  renderOverlay = () => (
    <div
      onClick={() => this.updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );
  getNavigation(){
    //let navigation=localStorageService.getSessionItem("navigations");
    let navigation=localStorageService.getLocalStorageItem("navigations");
    if(navigation && navigation.length>0){
      return navigation;
    }else {
      return navigations;
    }
    
  }
  render() {
    return (
      <Fragment>
        <Scrollbar option={{suppressScrollX: true}} className="scrollable position-relative">
          {this.props.children}
          <ViewEgretVerticalNav navigation={this.getNavigation()} />
        </Scrollbar>
        {this.renderOverlay()}
      </Fragment>
    );
  }
}
Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      setLayoutSettings
    }
  )(Sidenav)
);