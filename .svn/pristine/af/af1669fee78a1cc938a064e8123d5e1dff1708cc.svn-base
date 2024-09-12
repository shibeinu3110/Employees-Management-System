import React from "react";
import Toolbar from "react-big-calendar/lib/Toolbar";
import { navigate } from "react-big-calendar/lib/utils/constants";
import { Tooltip, IconButton, Icon } from "@material-ui/core";

const viewNameListObject = {
  month: {
    name: "Month",
    icon: "view_module"
  },
  week: {
    name: "Week",
    icon: "view_week"
  },
  work_week: {
    name: "Work week",
    icon: "view_array"
  },
  day: {
    name: "Day",
    icon: "view_day"
  },
  agenda: {
    name: "Agenda",
    icon: "view_agenda"
  }
};

class CalendarHeader extends Toolbar {
  state = {};

  renderViewButtons = () => {
    let viewNameList = this.props.views;
    const currentView = this.props.view;

    if (viewNameList.length > 1) {
      return viewNameList.map(view => (
        <Tooltip title={viewNameListObject[view].name} key={view}>
          <div>
            {/* <IconButton
              aria-label={view}
              onClick={() => this.props.onView(view)}
              disabled={currentView === view}
            >
              <Icon className="text-white">
                {viewNameListObject[view].icon}
              </Icon>
            </IconButton> */}
          </div>
        </Tooltip>
      ));
    }
  };

  render() {
    const { label } = this.props;

    return (
      <div className="calendar-header flex py-4 flex-space-around bg-primary">
        <div className="flex flex-center">
          <Tooltip title="Previous">
            <IconButton onClick={this.navigate.bind(null, navigate.PREVIOUS)}>
              <Icon className="text-white">chevron_left</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Today">
            <IconButton onClick={this.navigate.bind(null, navigate.TODAY)}>
              <Icon className="text-white">today</Icon>
            </IconButton>
          </Tooltip>

          <Tooltip title="Next">
            <IconButton onClick={this.navigate.bind(null, navigate.NEXT)}>
              <Icon className="text-white">chevron_right</Icon>
            </IconButton>
          </Tooltip>
        </div>

        <div className="flex flex-middle">
          <h6 className="m-0 text-white">{label}</h6>
        </div>

        <div className="flex">{this.renderViewButtons()}</div>
      </div>
    );
  }
}

export default CalendarHeader;
