import React, { Fragment } from "react";
import {
  Tooltip,
  Radio,
  RadioGroup,
  FormGroup,
  Icon,
  Switch,
  Slider,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper
} from "@material-ui/core";
import { get } from "lodash";
import { themeColors } from "../../EgretTheme/themeColors";
import BadgeSelected from "./BadgeSelected";
import { mainSidebarThemes, topbarThemes } from "./customizerOptions";

const sidebarBG = [
  "/assets/images/sidebar/sidebar-bg-dark.jpg",
  "/assets/images/sidebar/sidebar-bg-light.jpg"
];

const Layout1Customizer = ({ settings, handleChange, handleControlChange }) => {
  return (
    <Fragment>
      <div className="mb-16 mx-12">
        <div className="text-muted mb-4">Sidebar theme</div>
        <div className="colors">
          {mainSidebarThemes
            // .filter(c => themeColors[c].palette.type === "dark")
            .map((color, i) => (
              <Tooltip key={i} title={color} placement="top">
                <div
                  className="color"
                  onClick={() =>
                    handleChange("layout1Settings.leftSidebar.theme", color)
                  }
                  style={{
                    backgroundColor: themeColors[color].palette.primary.main
                  }}
                >
                  {settings.layout1Settings.leftSidebar.theme === color && (
                    <Icon>done</Icon>
                  )}
                  <div className={settings.themes[color].palette.type}></div>
                </div>
              </Tooltip>
            ))}
        </div>
      </div>

      <div className="mb-32 mx-12">
        <div className="text-muted mb-4">Topbar theme</div>
        <div className="colors">
          {topbarThemes
            .map((color, i) => (
              <Tooltip key={i} title={color} placement="top">
                <div
                  className="color"
                  onClick={() =>
                    handleChange("layout1Settings.topbar.theme", color)
                  }
                  style={{
                    backgroundColor: themeColors[color].palette.primary.main
                  }}
                >
                  {settings.layout1Settings.topbar.theme === color && (
                    <Icon>done</Icon>
                  )}
                  <div className={settings.themes[color].palette.type}></div>
                </div>
              </Tooltip>
            ))}
        </div>
      </div>

      <div className="mx-12 mb-24">
        <FormControl component="fieldset">
          <FormLabel component="legend">Sidebar mode</FormLabel>
          <RadioGroup
            aria-label="Sidebar"
            name="leftSidebar"
            value={settings.layout1Settings.leftSidebar.mode}
            onChange={handleControlChange("layout1Settings.leftSidebar.mode")}
          >
            <FormControlLabel value="full" control={<Radio />} label="Full" />
            <FormControlLabel value="close" control={<Radio />} label="Close" />
            <FormControlLabel
              value="compact"
              control={<Radio />}
              label="Compact"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <div className="mb-32 mx-12">
        <div className="text-muted">Sidebar background image</div>

        <div className="layout-boxes">
          {sidebarBG.map((bg, i) => (
            <BadgeSelected
              key={i}
              color="primary"
              className="layout-box"
              style={{ width: "calc(25% - 8px)" }}
              badgeContent={<Icon>done</Icon>}
              invisible={settings.layout1Settings.leftSidebar.bgImgURL !== bg}
            >
              <Paper
                onClick={() =>
                  handleChange("layout1Settings.leftSidebar.bgImgURL", bg)
                }
                style={{ height: "160px" }}
              >
                <img src={bg} alt="" />
              </Paper>
            </BadgeSelected>
          ))}
        </div>
      </div>

      <div className="mb-32 mx-12">
        <div className="text-muted">Sidebar background opacity</div>
        <Slider
          value={settings.layout1Settings.leftSidebar.bgOpacity}
          onChange={(event, value) =>
            handleChange("layout1Settings.leftSidebar.bgOpacity", value)
          }
          marks={true}
          step={0.02}
          max={1}
          min={0.5}
          valueLabelDisplay="auto"
          aria-labelledby="sidebar-bgOpacity"
        />
      </div>

      <div className="mx-12 mb-24">
        <FormControl component="fieldset">
          <FormLabel component="legend">Topbar</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={get(settings.layout1Settings.topbar, "show")}
                  onChange={handleControlChange("layout1Settings.topbar.show")}
                />
              }
              label="Show"
            />

            <FormControlLabel
              control={
                <Switch
                  checked={get(settings.layout1Settings.topbar, "fixed")}
                  onChange={handleControlChange("layout1Settings.topbar.fixed")}
                />
              }
              label="Fixed"
            />
          </FormGroup>
        </FormControl>
      </div>
    </Fragment>
  );
};

export default Layout1Customizer;
