import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  setLayoutSettings,
  setDefaultSettings
} from "app/redux/actions/LayoutActions";
import { PropTypes } from "prop-types";
import {
  Icon,
  IconButton,
  FormGroup,
  Tooltip,
  Switch,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  withStyles,
  MuiThemeProvider
} from "@material-ui/core";
import Scrollbar from "react-perfect-scrollbar";
import { merge, get, set } from "lodash";
import Layout1Customizer from "./Layout1Customizer";
import Layout2Customizer from "./Layout2Customizer";
import { themeColors } from "../../EgretTheme/themeColors";
import BadgeSelected from "./BadgeSelected";
import { mainThemes, topbarThemes } from "./customizerOptions";
import ConstantList from "../../../appConfig";
const styles = theme => ({
  root: {
    
  },
  paper: {
    display: "inherit"
  }
});

class EgretCustomizer extends Component {
  state = {
    open: false
  };

  updateSettings = newSettings => {
    let { settings, setLayoutSettings, setDefaultSettings } = this.props;
    let updatedSettings = merge({}, settings, newSettings);
    setLayoutSettings(updatedSettings);
    setDefaultSettings(updatedSettings);
  };

  selectLayout = activeLayout => {
    this.updateSettings({ activeLayout });
  };

  handleChange = (name, value) => {
    let { settings } = this.props;
    let updatedSettings = set(settings, name, value);

    this.updateSettings(updatedSettings);
  };

  handleControlChange = name => event => {
    let controlValue =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    this.handleChange(name, controlValue);
  };

  tooglePanel = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    let { settings, classes } = this.props;
    let activeTheme = { ...settings.themes[settings.activeTheme] };
    // console.log(activeTheme);

    return (
      <Fragment>
        <Tooltip title="Theme Settings" placement="left">
          <IconButton
            size="small"
            aria-label="delete"
            className="my-12"
            onClick={this.tooglePanel}
          >
            <Icon className="spin">settings</Icon>
          </IconButton>
        </Tooltip>

        {this.state.open && (
          <MuiThemeProvider theme={activeTheme}>
            <div
              className={`egret-customizer pb-8 ${classes.root}`}
              style={{
                backgroundColor: activeTheme.palette.background.default
              }}
            >
              <div className="flex felx-row flex-middle p-16 mb-16 elevation-z6" style={{minHeight: "64px"}}>
                <Icon color="primary">settings</Icon>
                <h5 className="mb-0 ml-8">Theme Settings</h5>
                <IconButton
                  onClick={this.tooglePanel}
                  className="customizer-close"
                >
                  <Icon>close</Icon>
                </IconButton>
              </div>
              <Scrollbar options={{ suppressScrollX: true }} className="px-16">
                <div className="mt-8 mb-32 mx-12">
                  <div className="text-muted">Layouts</div>

                  <div className="layout-boxes">
                    <BadgeSelected
                      color="secondary"
                      className="layout-box"
                      badgeContent={<Icon>done</Icon>}
                      invisible={settings.activeLayout !== "layout1"}
                    >
                      <Paper onClick={() => this.selectLayout("layout1")} elevation={4}>
                        <img
                          src= {ConstantList.ROOT_PATH+"assets/images/screenshots/layout1-customizer.png"}
                          alt=""
                        />
                      </Paper>
                    </BadgeSelected>
                    <BadgeSelected
                      color="secondary"
                      className="layout-box"
                      badgeContent={<Icon>done</Icon>}
                      invisible={settings.activeLayout !== "layout2"}
                    >
                      <Paper onClick={() => this.selectLayout("layout2")} elevation={4}>
                        <img
                          src= {ConstantList.ROOT_PATH+"assets/images/screenshots/layout2-customizer.png"}
                          alt=""
                        />
                      </Paper>
                    </BadgeSelected>
                  </div>
                </div>
                {/* END LAYOUT */}

                <div className="mb-16 mx-12">
                  <div className="text-muted mb-4">Main theme</div>
                  <div className="colors">
                    {mainThemes.map((color, i) => (
                      <Tooltip key={i} title={color} placement="top">
                        <div
                          className="color"
                          onClick={() =>
                            this.updateSettings({ activeTheme: color })
                          }
                          style={{
                            backgroundColor:
                              themeColors[color].palette.primary.main
                          }}
                        >
                          {settings.activeTheme === color && <Icon>done</Icon>}
                          <div
                            className={settings.themes[color].palette.type}
                          ></div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                {settings.activeLayout === "layout1" && (
                  <Layout1Customizer
                    settings={settings}
                    handleChange={this.handleChange}
                    handleControlChange={this.handleControlChange}
                  />
                )}

                {settings.activeLayout === "layout2" && (
                  <Layout2Customizer
                    settings={settings}
                    handleChange={this.handleChange}
                    handleControlChange={this.handleControlChange}
                  />
                )}

                <div className="mx-12 mb-24">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Footer</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={get(settings.footer, "show")}
                            onChange={this.handleControlChange("footer.show")}
                          />
                        }
                        label="Show"
                      />

                      <FormControlLabel
                        control={
                          <Switch
                            checked={get(
                              settings.layout1Settings.footer,
                              "fixed"
                            )}
                            onChange={this.handleControlChange("footer.fixed")}
                          />
                        }
                        label="Fixed"
                      />
                    </FormGroup>
                  </FormControl>
                </div>

                <div className="mx-12 mb-24">
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Secondary sidebar</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={get(settings.secondarySidebar, "show")}
                            onChange={this.handleControlChange(
                              "secondarySidebar.show"
                            )}
                          />
                        }
                        label="Show"
                      />
                    </FormGroup>
                  </FormControl>
                </div>

                <div className="mb-16 mx-12">
                  <div className="text-muted mb-4">Secondary sidebar theme</div>
                  <div className="colors">
                    {topbarThemes
                    .map((color, i) => (
                      <Tooltip key={i} title={color} placement="top">
                        <div
                          className="color"
                          onClick={() =>
                            this.handleChange("secondarySidebar.theme", color)
                          }
                          style={{
                            backgroundColor:
                              themeColors[color].palette.primary.main
                          }}
                        >
                          {settings.secondarySidebar.theme === color && (
                            <Icon>done</Icon>
                          )}
                          <div
                            className={settings.themes[color].palette.type}
                          ></div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>

                <div className="mb-16 mx-12">
                  <div className="text-muted mb-4">Footer theme</div>
                  <div className="colors">
                    {topbarThemes
                    .map((color, i) => (
                      <Tooltip key={i} title={color} placement="top">
                        <div
                          className="color"
                          onClick={() =>
                            this.handleChange("footer.theme", color)
                          }
                          style={{
                            backgroundColor:
                              themeColors[color].palette.primary.main
                          }}
                        >
                          {settings.footer.theme === color && <Icon>done</Icon>}
                          <div
                            className={settings.themes[color].palette.type}
                          ></div>
                        </div>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              </Scrollbar>
            </div>
          </MuiThemeProvider>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.layout.settings,
  setLayoutSettings: PropTypes.func.isRequired,
  setDefaultSettings: PropTypes.func.isRequired
});

export default withStyles(styles, { withTheme: true })(
  connect(
    mapStateToProps,
    { setLayoutSettings, setDefaultSettings }
  )(EgretCustomizer)
);
