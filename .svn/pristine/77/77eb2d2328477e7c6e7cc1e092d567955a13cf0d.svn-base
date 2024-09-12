import React, { Component } from "react";
import { Button } from "@material-ui/core";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import CalendarHeader from "./CalendarHeader";
import * as ReactDOM from "react-dom";
import { Breadcrumb } from "egret";
import { getAllEvents, updateEvent } from "./CalendarService";
import EventEditorDialog from "./EventEditorDialog";

const localizer = momentLocalizer(moment);

const DragAndDropCalendar = withDragAndDrop(Calendar);

let viewList = Object.keys(Views).map(key => Views[key]);

class EgretCalendar extends Component {
  state = {
    events: [],
    shouldShowEventDialog: false,
    newEvent: null
  };

  constructor(props) {
    super(props);
    this.headerComponentRef = React.createRef();
  }

  componentDidMount() {
    this.updateCalendar();
  }

  updateCalendar = () => {
    getAllEvents()
      .then(res => res.data)
      .then(events => {
        this.setState({ events });
      });
  };

  handleDialogClose = () => {
    this.setState({ shouldShowEventDialog: false });
    this.updateCalendar();
  };

  handleEventMove = event => {
    this.handleEventResize(event);
  };

  handleEventResize = event => {
    updateEvent(event).then(() => {
      this.updateCalendar();
    });
  };

  openNewEventDialog = ({ action, ...event }) => {
    if (action === "doubleClick") {
      this.setState({
        newEvent: event,
        shouldShowEventDialog: true
      });
    }
  };

  openExistingEventDialog = event => {
    this.setState({
      newEvent: event,
      shouldShowEventDialog: true
    });
  };

  render() {
    let { events, newEvent, shouldShowEventDialog } = this.state;
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Calendar" }]} />
        </div>

        <Button
          className="mb-16"
          variant="contained"
          color="secondary"
          onClick={() =>
            this.openNewEventDialog({
              action: "doubleClick",
              start: new Date(),
              end: new Date()
            })
          }
        >
          Add Event
        </Button>
        <div className="h-700 flex-column">
          <div ref={this.headerComponentRef} />
          <DragAndDropCalendar
            selectable
            localizer={localizer}
            events={events}
            onEventDrop={this.handleEventMove}
            resizable
            onEventResize={this.handleEventResize}
            defaultView={Views.MONTH}
            defaultDate={new Date()}
            startAccessor="start"
            endAccessor="end"
            views={viewList}
            step={60}
            showMultiDayTimes
            components={{
              toolbar: props => {
                return this.headerComponentRef.current ? (
                  ReactDOM.createPortal(
                    <CalendarHeader {...props} />,
                    this.headerComponentRef.current
                  )
                ) : (
                  <div>Header component not found</div>
                );
              }
            }}
            // onNavigate={this.handleNavigate}
            onSelectEvent={event => {
              this.openExistingEventDialog(event);
            }}
            onSelectSlot={slotDetails => this.openNewEventDialog(slotDetails)}
          />
        </div>
        {shouldShowEventDialog && (
          <EventEditorDialog
            handleClose={this.handleDialogClose}
            open={shouldShowEventDialog}
            event={newEvent}
          />
        )}
      </div>
    );
  }
}

export default EgretCalendar;
