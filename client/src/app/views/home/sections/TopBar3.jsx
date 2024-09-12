import {
  Icon,
  IconButton,
  Fab
} from "@material-ui/core";
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import React, { Component } from "react";
import { debounce, classList } from "utils";
import { NavLink } from "react-router-dom";
import ScrollTo from "../common/ScrollTo";
import ConstantList from "../../../appConfig";

class TopBar3 extends Component {
  handleSignOut = () => { this.props.logoutUser(); };
  state = {
    isTop: true,
    isClosed: true
  };
  handleScrollRef;
  scrollableElement;
  componentDidMount() {
    this.scrollableElement = document.querySelector(".scrollable-content");
    if (!this.scrollableElement) this.scrollableElement = window;
    if (this.scrollableElement) {
      this.handleScrollRef = this.handleScroll();
      this.scrollableElement.addEventListener("scroll", this.handleScrollRef);
    }
  }

  componentWillUnmount() {
    if (this.scrollableElement) {
      this.scrollableElement.removeEventListener(
        "scroll",
        this.handleScrollRef
      );
    }
  }

  handleScroll() {
    return debounce(() => {
      if (this.scrollableElement) {
        let isTop = this.scrollableElement.scrollY < 100;
        if (isTop !== this.state.isTop) {
          this.setState({ isTop });
        }
      }
    }, 20);
  }

  close = () => {
    this.setState({ isClosed: true });
  };
  render() {
    const { t, i18n } = this.props;
    let toggleIcon = this.state.isClosed ? "menu" : "close";
    return (
      <section
        className={classList({
          header: true,
          "header-fixed": !this.state.isTop,
          closed: this.state.isClosed
        })}
      >
        <div className="container header-container">
          <div className="brand">
            <img src="./assets/images/logo-full.png" alt="" />
          </div>
          <ul className="navigation">
            <li>
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            {/* <li>
              <ScrollTo to="intro3" onScroll={this.close}>
                Home
              </ScrollTo>
            </li> */}
          </ul>
          <div className="m-auto" />
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="Buy"
            className="mr-16"
            href={ConstantList.ROOT_PATH + "session/signup-register-account"}
          >
            <Icon className="mr-16">person_add</Icon>
            {t("sign_up.title")}
          </Fab>

          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="Buy"
            className=""
            onClick={this.handleSignOut}
          >
            <Icon className="mr-16">person_pin</Icon>
            {t("sign_in.title")}
          </Fab>
          <IconButton
            className="header__toggle"
            onClick={() => {
              this.setState({ isClosed: !this.state.isClosed });
            }}
          >
            <Icon>{toggleIcon}</Icon>
          </IconButton>
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
  { logoutUser }
)(TopBar3);