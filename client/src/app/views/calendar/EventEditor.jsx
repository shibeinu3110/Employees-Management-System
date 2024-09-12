import React, { Component } from "react";
import { Dialog, IconButton, Button, Icon, Grid } from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { addNewEvent, updateEvent, deleteEvent } from "./CalendarService";

export default class EventEditor extends Component {
  state = {
    title: "",
    startTime: "",
    endTime: "",
    location: "",
    note: ""
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    if (id) {
      updateEvent({
        ...this.state
      }).then(() => {
        this.props.handleOKClose();
      });
    } else {
      addNewEvent({
        ...this.state
      }).then(() => {
        this.props.handleClose();
        this.props.handleOKClose();
      });
    }
  };

  handleDeleteEvent = () => {
    if (this.state.id) {
      deleteEvent(this.state).then(() => {
        this.props.handleClose();
      });
    }
  };
  handleDiaglogClose = () => {
    this.props.handleClose();
  };
  handleDateChange = (date, name) => {
    this.setState({
      [name]: date
    });
  };

  generateRandomId = () => {
    let tempId = Math.random().toString();
    let id = tempId.substr(2, tempId.length - 1);
    return id;
  };

  componentWillMount() {
    this.setState({
      ...this.props.event
    });
  }

  render() {
    let { title, startTime, endTime, location, note,chairman } = this.state;
    let { open, handleClose,handleOKClose,event,t } = this.props;

    return (
      <div>
      <div className="flex flex-space-between flex-middle pl-16 pr-8 py-8 bg-primary">
          <h4 className="m-0 text-white">Add Events</h4>
          <IconButton onClick={handleClose}>
            <Icon className="text-white">clear</Icon>
          </IconButton>
        </div>

        <div className="p-24">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <TextValidator
              className="mb-24 w-100"
              label="Title"
              onChange={this.handleChange}
              type="text"
              name="title"
              value={title}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
              <Grid item sm={12} xs={12}>
                <TextValidator
                  label={t("Calendar.Chairman")}
                  //validators={["required"]}
                  //errorMessages={["this field is required"]}
                  id="chairman" className="w-80 mb-16 mr-16" value={chairman != null ? chairman.name : ''} />
                <Button
                  className="mb-16"
                  className="mb-16 align-bottom"
                  variant="contained"
                  color="primary"
                  onClick={() => this.setState({ shouldOpenSearchOrgTypeDialog: true, item: {} })}
                >
                  {t('Select')}
                </Button>
              </Grid>
            <Grid container spacing={4}>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    margin="none"
                    id="mui-pickers-date"
                    label="Start date"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={startTime}
                    onChange={date => this.handleDateChange(date, "startTime")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item sm={6} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    margin="none"
                    id="mui-pickers-date"
                    label="End date"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={endTime}
                    onChange={date => this.handleDateChange(date, "endTime")}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <div className="py-8" />
            <TextValidator
              className="mb-24 w-100"
              label="Location"
              onChange={this.handleChange}
              type="text"
              name="location"
              value={location}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextValidator
              className="mb-36 w-100"
              label="Note"
              onChange={this.handleChange}
              type="text"
              name="note"
              value={note}
              rowsMax={2}
              multiline={true}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button onClick={this.handleDiaglogClose} variant="contained" color="primary" type="button">
                {t('Cancel')}
              </Button>
            </div>
          </ValidatorForm>
        </div>  
      </div>
    );
  }
}

//export default EventEditorDialog;
