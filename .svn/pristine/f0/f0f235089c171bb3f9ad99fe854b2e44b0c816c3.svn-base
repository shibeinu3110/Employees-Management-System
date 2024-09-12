import React, { Component } from "react";
import {
  MuiThemeProvider,
  Badge,
  Fab,
  IconButton,
  Icon
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { classList, isMobile, debounce } from "utils";
import EgretCustomizer from "./EgretCustomizer/EgretCustomizer";
import { withStyles } from "@material-ui/styles";
import ShoppingCart from "./ShoppingCart";

const width = "50px";

const styles = theme => ({
  root: {
    position: "fixed",
    height: "100vh",
    width,
    right: `-${width}`,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: theme.shadows[8],
    zIndex: 98,
    transition: "all 0.15s ease",
    "&.open": {
      right: 0,
      "& .toggle": {
        left: 0
      }
    },
    "& .toggle": {
      position: "relative",
      left: "-28px",
      bottom: "20px",
      transition: "all 0.15s ease"
    }
  }
});

class SecondarySidebar extends Component {
  state = {
    open: true
  };
  listenWindowResizeRef;

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  componentWillMount() {
    this.setState({ open: !isMobile() });
    if (window) {
      this.listenWindowResizeRef = this.listenWindowResize();
      // LISTEN WINDOW RESIZE
      window.addEventListener("resize", this.listenWindowResizeRef);
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener("resize", this.listenWindowResizeRef);
    }
  }

  listenWindowResize = () => {
    return debounce(() => {
      this.setState({ open: !isMobile() });
    }, 100);
  };

  render() {
    let { settings, classes, theme } = this.props;
    const secondarySidebarTheme =
      settings.themes[settings.secondarySidebar.theme] || theme;

    return (
      <MuiThemeProvider theme={secondarySidebarTheme}>
        {this.state.open && !isMobile() && (
          <Helmet>
            <style>
              {`
              .content-wrap, 
              .layout2.layout-contained, 
              .layout2.layout-full {
                margin-right: ${width};
              }
              @media screen and (max-width: 959px) {
                .toolbar-menu-wrap .menu-area {
                  width: calc(100% - ${width});
                }
              }
              .egret-customizer {
                right: ${width};
              }
            `}
            </style>
          </Helmet>
        )}

        <div
          className={
            classes.root +
            " " +
            classList({
              open: this.state.open,
              "secondary-sidebar": true
            })
          }
          style={{
            backgroundColor: secondarySidebarTheme.palette.primary.main
          }}
        >
          <span className="m-auto"></span>

          <EgretCustomizer />

          <ShoppingCart/>

          <IconButton size="small" aria-label="delete" className="my-12">
            <Icon>comments</Icon>
          </IconButton>

          {/* Toggle Button */}
          <span className="m-auto"></span>
          <div className="toggle">
            {this.state.open && (
              <IconButton
                onClick={this.toggle}
                size="small"
                aria-label="toggle"
              >
                <Icon>arrow_right</Icon>
              </IconButton>
            )}
            {!this.state.open && (
              <Fab
                variant="extended"
                size="small"
                color="primary"
                aria-label="add"
                className="pr-36"
                onClick={this.toggle}
              >
                <Icon>arrow_left</Icon>
              </Fab>
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.layout.settings
});

export default withStyles(styles, { withTheme: true })(
  withRouter(
    connect(
      mapStateToProps,
      {}
    )(SecondarySidebar)
  )
);
