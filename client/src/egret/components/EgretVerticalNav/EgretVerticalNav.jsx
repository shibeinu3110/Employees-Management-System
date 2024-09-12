import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import EgretVerticalNavExpansionPanel from "./EgretVerticalNavExpansionPanel";
import { withStyles } from "@material-ui/styles";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import ConstantList from "../../../app/appConfig.js";
const ViewEgretVerticalNavExpansionPanel = withTranslation()(
  EgretVerticalNavExpansionPanel
);
const styles = theme => ({
  expandIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(90deg)"
  },
  collapseIcon: {
    transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    transform: "rotate(0deg)"
  }
});

class EgretVerticalNav extends Component {
  state = {
    collapsed: true
  };

  renderLevels = data => {
    const { t, i18n, classes } = this.props;
    return data.map((item, index) => {
      if (
        item.path && item.path.length > 0 &&
        !item.path.startsWith(ConstantList.ROOT_PATH)
      ) {
        item.path = ConstantList.ROOT_PATH + item.path;
      }
      let visible = item.isVisible;
      if (item.children && item.children.length > 0) {
        return (
          <ViewEgretVerticalNavExpansionPanel item={item} key={index}>
            {this.renderLevels(item.children)}
          </ViewEgretVerticalNavExpansionPanel>
        );
      } else if (visible) {
        if (item.path == null) {
          item.path = "";
        }
        return (
          <NavLink key={index} to={item.path} className="nav-item">
            <TouchRipple key={item.name} name="child" className="w-100">
              {(() => {
                if (item.icon) {
                  return (
                    <Icon className="item-icon text-middle">{item.icon}</Icon>
                  );
                } else {
                  return (
                    <span className="item-icon icon-text">{item.iconText}</span>
                  );
                }
              })()}
              <span className="text-middle pl-20 item-text">
                {t(item.name)}
              </span>
              <div className="mx-auto"></div>
              {item.badge && (
                <div className={`badge bg-${item.badge.color}`}>
                  {item.badge.value}
                </div>
              )}
            </TouchRipple>
          </NavLink>
        );
      }
    });
  };

  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <div className="navigation">
        {this.renderLevels(this.props.navigation)}
      </div>
    );
  }
}

export default withStyles(styles)(EgretVerticalNav);
