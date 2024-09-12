import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
// import { searchByPage } from "./RoleService";

class RoleEditorDialog extends Component {
  state = {
    name: "",
    code: "",
    shortName:"",
    description:"",
    isActive: false
  };

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    let { code } = this.state;

    // checkCode(id, code).then((result) => {
    //   //Nếu trả về true là code đã được sử dụng
    //   if (result.data) {
    //     alert("Code đã được sử dụng");
    //   } else {
    //     //Nếu trả về false là code chưa sử dụng có thể dùng
    //     if (id) {
    //         updateRole({
    //         ...this.state
    //       }).then(() => {
    //         this.props.handleOKEditClose();
    //       });
    //     } else {
    //         addNewRole({
    //         ...this.state
    //       }).then(() => {
    //         this.props.handleOKEditClose();
    //       });
    //     }
    //   }
    // });
  };

  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose,item } = this.props;
    this.setState(item);
  }

  render() {
    let {
      id,
      name,
      code,
      shortName,
      description
    } = this.state;
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          <h4 className="mb-20"> {t("Code")} </h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Code")}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Name")}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Short_Name")}
                  onChange={this.handleChange}
                  type="text"
                  name="shortName"
                  value={shortName}
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={t("Description")}
                  onChange={this.handleChange}
                  type="text"
                  name="description"
                  value={description}
                />
              </Grid>
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="primary" type="submit">
              {t("Save")}
              </Button>
              <Button variant="contained" color="secondary" onClick={() => this.props.handleClose()}>{t("Cancel")}</Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default RoleEditorDialog;
