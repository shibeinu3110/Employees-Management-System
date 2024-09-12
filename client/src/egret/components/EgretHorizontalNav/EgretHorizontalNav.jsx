import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@material-ui/core";
import TouchRipple from "@material-ui/core/ButtonBase";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
class EgretHorizontalNav extends Component {
  // state = {
  //   collapsed: true
  // };

  constructor(props) {
		super(props);
		this.state = {
			opened: false,
		};
		this.handleClick = this.handleClick.bind(this);
	}
  renderLevels = levels => {
    const { t, i18n,classes } = this.props;
    return levels.map((item, key) => {
      if (item.children) {
        return (
          <li key={key}>
            <a href="/">
              {item.icon && (
                <Icon className="item-icon text-middle">{item.icon}</Icon>
              )}
              {t(item.name)}
            </a>
            <ul>{this.renderLevels(item.children)}</ul>
          </li>
        );
      } else {
        return (
          <li key={key} onClick={this.handleClick}>
            <NavLink to={item.path} >
              {item.icon && (
                <Icon className="item-icon text-middle">{item.icon}</Icon>
              )}
              {t(item.name)}
            </NavLink>
          </li>
        );
      }
    });
  };
  handleClick = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    let max = this.props.max;
    let navigation = this.props.navigation;
    if (max && navigation.length > max) {
      let childItem = {
        name: "More",
        icon: "more_vert",
        children: navigation.slice(max, navigation.length)
      };
      navigation = navigation.slice(0, max);
      navigation.push(childItem);
    }     
    return (
      <div className="horizontal-nav">
        <ul className="menu">{this.renderLevels(navigation)}</ul>
      </div>
    );
  }
}
export default EgretHorizontalNav;
