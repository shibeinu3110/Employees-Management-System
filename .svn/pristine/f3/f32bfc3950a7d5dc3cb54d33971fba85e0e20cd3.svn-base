import React, { Component, Fragment } from "react";
import UploadForm from "./UploadForm";
import ConstantList from "../../appConfig";
import {
  Card,
  Icon,
  Avatar,
  Grid,
  Select,
  FormControl,
  Divider,
  IconButton,
  Button,
  withStyles,
  InputLabel,
  FormControlLabel,
  TextField,
  Checkbox,
} from "@material-ui/core";
import DummyChart from "./DummyChart";
import ProfileBarChart from "./ProfileBarChart";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import localStorageService from "../../services/localStorageService";
import { useTranslation, withTranslation, Trans, t } from "react-i18next";
import MenuItem from "@material-ui/core/MenuItem";
import {
  getCurrentUser,
  saveItem,
  saveUser,
  getUserByUsername,
  saveOrUpdateUser,
  getListHealthOrgByUser,
} from "./UserProfileService";
import UploadCropImagePopup from "./UploadCropImagePopup";
import ChangePasswordDiaglog from "./ChangePasswordPopup";
import authService from "../../services/jwtAuthService";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/views/_style.scss";
const API_PATH = ConstantList.API_ENPOINT + "/api/fileUpload/";

toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3,
});
class UserProfile extends Component {
  state = {
    open: true,
    user: {},
    healthOrg: {},
    shouldOpenImageDialog: false,
    shouldOpenPasswordDialog: false,
    checkHealthOrg: false,
    name: "",
    taxCodeOfTheUnit: "",
    code: "",
    specifyTestPurpose: "",
    address: "",
    specifyLevel: "",
    positiveAffirmativeRight: true,
    shouldOpenSearchDialog: false,
    shouldOpenConfirmationDialog: false,
    qualificationSelect: [],
    qualification: {},
    officerPosion: "",
    unitCodeOfProgramPEQAS: "",
    testpurposeSelect: [],
    testPurpose1: {},
    testPurpose2: {},
    testPurpose3: {},
    testPurpose4: {},
    levelHealOrg: [],
    healthOrgTypeSelect: [],
    healthOrgType: [],
    administrativeUnit: "",
    fax: "",
    isView: false,
    shouldOpenAdministrativeUnitsPopup: false,
    level: {},
    sampleReceiptDate: new Date(),
    sampleRecipient: "",
    specifySampleStatus: "",
    specifyQualification: "",
    isManualSetCode: false,
    hasErrorLever: false,
    levelId: "",
    loading: false,
  };

  windowResizeListener;

  toggleSidenav = () => {
    this.setState({
      open: !this.state.open,
    });
  };

  handleWindowResize = () => {
    return (event) => {
      if (event.target.innerWidth < 768) {
        this.setState({ mobile: true });
      } else this.setState({ mobile: false });
    };
  };

  componentDidMount() {
    let checkHealthOrg = false;
    let { healthOrg } = this.state;
    getCurrentUser().then(({ data }) => {
      data.roles.forEach((res) => {
        if (
          res.name == "ROLE_HEALTH_ORG" &&
          res.authority == "ROLE_HEALTH_ORG"
        ) {
          checkHealthOrg = true;
        }
      });
      if (checkHealthOrg) {
        getListHealthOrgByUser(data.id).then((listHealthOrg) => {
          healthOrg = listHealthOrg.data[0];
          this.setState({ healthOrg: healthOrg }, () => {});
        });
      }

      this.setState({ user: data, checkHealthOrg: checkHealthOrg }, () => {
        // console.log(this.state.user)
      });
      this.setState({ ...data });
    });
    //let user = localStorageService.getLoginUser();
    if (window.innerWidth < 768) {
      this.setState({ open: false });
    }
    if (window)
      this.windowResizeListener = window.addEventListener("resize", (event) => {
        if (event.target.innerWidth < 768) {
          this.setState({ open: false });
        } else this.setState({ open: true });
      });
    
  }
  handleChange = (event, source) => {
    event.persist();

    if (source === "displayName") {
      let { person } = this.state;
      person = person ? person : {};
      person.displayName = event.target.value;
      this.setState({ person: person });
      // this.setState({ person: person });
      return;
    }
    if (source === "firstName") {
      let { person, displayName, healthOrg } = this.state;
      if (
        this.state.person != null &&
        this.state.person.lastName != null &&
        this.state.person.lastName != ""
      ) {
        person.displayName =
          event.target.value + " " + this.state.person.lastName;
        displayName = event.target.value + " " + this.state.person.lastName;
      } else {
        person.displayName = event.target.value + "";
        displayName = event.target.value + "";
      }
      person = person ? person : {};
      healthOrg = healthOrg ? healthOrg : {};
      person.firstName = event.target.value;
      healthOrg.name = displayName;
      this.setState({
        healthOrg: healthOrg,
        person: person,
        displayName: displayName,
      });
      return;
    }
    if (source === "lastName") {
      let { person, displayName, healthOrg } = this.state;
      person = person ? person : {};
      healthOrg = healthOrg ? healthOrg : {};
      if (
        this.state.person != null &&
        this.state.person.firstName != null &&
        this.state.person.firstName != ""
      ) {
        person.displayName =
          this.state.person.firstName + " " + event.target.value;
        displayName = this.state.person.firstName + " " + event.target.value;
      } else {
        person.displayName = "" + event.target.value;
        displayName = "" + event.target.value;
      }
      person.lastName = event.target.value;
      healthOrg.name = displayName;
      this.setState({
        healthOrg: healthOrg,
        person: person,
        displayName: displayName,
      });
      return;
    }

    if (source === "gender") {
      let { person } = this.state;
      person = person ? person : {};
      person.gender = event.target.value;
      this.setState({ person: person });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  componentWillUnmount() {
    let user = localStorageService.getLoginUser();
    getCurrentUser();
    this.setState({ user: user });
    this.setState(user);
    if (window) window.removeEventListener("resize", this.windowResizeListener);
  }
  handleOpenUploadDialog = () => {
    this.setState({
      shouldOpenImageDialog: true,
    });
  };
  handleDialogClose = () => {
    this.setState({
      shouldOpenImageDialog: false,
    });
  };
  handleOpenPasswordDialog = () => {
    this.setState({
      shouldOpenPasswordDialog: true,
    });
  };
  handleDialogPasswordClose = () => {
    this.setState({
      shouldOpenPasswordDialog: false,
    });
  };

  openPasswordDialog = () => {
    this.setState({
      shouldOpenPasswordDialog: true,
    });
  };
  handleUpdate = (blobValue) => {
    let { t } = this.props;
    const url = ConstantList.API_ENPOINT + "/api/users/updateavatar";
    let formData = new FormData();
    formData.set("uploadfile", blobValue);
    //formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
      headers: {
        "Content-Type": "image/jpg",
      },
    };
    return axios
      .post(url, formData, config)
      .then((response) => {
        toast.success(t("update_success_message"));
        let user = response.data;
        this.setState({ user: user });
        authService.setLoginUser(user);
        this.handleDialogClose();
      })
      .catch(() => {
        toast.warning(t("error_update_image"));
      });
  };
  handleFormSubmit = () => {
    let { id, healthOrg, checkHealthOrg } = this.state;
    let { t } = this.props;
    // console.log(healthOrg, checkHealthOrg);
    // this.setState({isView: true});
    if (id) {
      saveOrUpdateUser({
        ...this.state,
      }).then((data) => {
        toast.success(t("mess_edit"));
      });
    } else {
      saveOrUpdateUser({
        ...this.state,
      }).then((data) => {
        this.setState({ isView: true });
        toast.success(t("mess_add"));
      });
    }

    if (checkHealthOrg && healthOrg != null) {
      saveItem(healthOrg).then(() => {});
    }
  };
  handleFormSubmitAdmin = () => {
    let {
      id,
      code,
      isManualSetCode,
      email,
      hasErrorLever,
      levelId,
    } = this.state;
    let { t } = this.props;
    this.setState({ loading: true });

    // if(levelId == "" ){
    //   this.setState({hasErrorLever: true, loading:false});
    //   return
    // }
    if (email != null) {
      // checkEmail(id, email).then((res) => {
      //   if (res.data) {
      //     toast.warning(t("sign_up.duplicate_email"));
      //     this.setState({ loading: false });
      //     return;
      //   }
        // } else {
        //   if (id) {
        //     saveItemHealthOrg({
        //       ...this.state,
        //     }).then(() => {
        //       // this.props.handleOKEditClose();
        //       this.setState({ loading: false });
        //       toast.success(t("mess_edit"));
        //     });
        //   }
        //   // console.log(123);
        // }
      // });
    }

    // console.log(this.state);
  };
  render() {
    let {
      open,
      email,
      contactPhone,
      contactName,
      user,
      healthOrg,
      shouldOpenImageDialog,
      shouldOpenPasswordDialog,
      checkHealthOrg,
      name,
      taxCodeOfTheUnit,
      code,
      specifyTestPurpose,
      address,
      specifyLevel,
      positiveAffirmativeRight,
      isManualSetCode,
      hasErrorLever,
      levelId,
      loading,
    } = this.state;
    let { theme } = this.props;
    let { t, i18n } = this.props;
    // console.log(checkHealthOrg);
    const genders = [
      { id: "M", name: "Nam" },
      { id: "F", name: "Nữ" },
      { id: "U", name: "Không rõ" },
    ];
    // console.log(user);
    //alert('Render');
    return (
      <div className="m-sm-30">
        {this.state.shouldOpenImageDialog && (
          <UploadCropImagePopup
            t={t}
            i18n={i18n}
            handleClose={this.handleDialogClose}
            handleUpdate={this.handleUpdate}
            open={this.state.shouldOpenImageDialog}
            uploadUrl={API_PATH + "avatarUpload"}
            acceptType="png;jpg;gif;jpeg"
          />
        )}
        {this.state.shouldOpenPasswordDialog && (
          <ChangePasswordDiaglog
            t={t}
            i18n={i18n}
            handleClose={this.handleDialogPasswordClose}
            handleUpdate={this.handleUpdate}
            open={this.state.shouldOpenPasswordDialog}
            uploadUrl={API_PATH + "avatarUpload"}
            acceptType="png;jpg;gif;jpeg"
            user={user}
          />
        )}
        <div>
          {
            <span className="styleColor">
              {checkHealthOrg ? t("user.healthOrg") : t("user.person_info")}
            </span>
          }
        </div>
        <div className="user-profile__sidenav flex-column flex-middle">
          {this.state.user && this.state.user ? (
            <Avatar
              className="avatar mb-20"
              src={ConstantList.API_ENPOINT + this.state.user.imagePath}
              onClick={this.handleOpenUploadDialog}
            />
          ) : (
            <div>
              <Avatar
                className="avatar mb-20"
                src={ConstantList.ROOT_PATH + "assets/images/avatar.jpg"}
                onClick={this.handleOpenUploadDialog}
              />
            </div>
          )}
          {/* {user.displayName} */}
          {
            <span className="title">
              {" "}
              {this.state.displayName != null
                ? this.state.displayName
                : ""}{" "}
            </span>
          }
        </div>
        {!checkHealthOrg && (
          <ValidatorForm
            ref="form"
            onSubmit={this.handleFormSubmit}
            style={{
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div className="m-sm-30" t={t} i18n={i18n}>
              <Grid className="mb-8 mt-8" container spacing={3}>
                <Grid item item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    id="standard-basic"
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("user.firstName")}
                      </span>
                    }
                    value={
                      this.state.person != null
                        ? this.state.person.firstName
                        : ""
                    }
                    onChange={(firstName) =>
                      this.handleChange(firstName, "firstName")
                    }
                    size="small"
                    variant="outlined"
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                    className="w-100"
                  />
                </Grid>

                <Grid item item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    id="standard-basic"
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("user.lastName")}
                      </span>
                    }
                    size="small"
                    variant="outlined"
                    value={
                      this.state.person != null
                        ? this.state.person.lastName
                        : ""
                    }
                    onChange={(lastName) =>
                      this.handleChange(lastName, "lastName")
                    }
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                    className="w-100"
                  />
                </Grid>

                <Grid item item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    id="standard-basic"
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("user.displayName")}
                      </span>
                    }
                    size="small"
                    variant="outlined"
                    value={
                      this.state.displayName != null
                        ? this.state.displayName
                        : ""
                    }
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                    className="w-100"
                  />
                </Grid>
              </Grid>

              <Grid className="mb-10" container spacing={3}>
                {/* <Grid item md={4} sm={12} xs={12}>
            <FormControl fullWidth={true}>
              <TextField id="standard-basic"  label={t('user.email')} value={this.state.email != null ? user.email : ''} 
                onChange={this.handleChange}
              />
            </FormControl>
          </Grid> */}

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100"
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("user.email")}
                      </span>
                    }
                    size="small"
                    variant="outlined"
                    onChange={this.handleChange}
                    type="text"
                    name="email"
                    value={this.state.email ? this.state.email : ""}
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100"
                    size="small"
                    variant="outlined"
                    label={<span className="font">{t("user.username")}</span>}
                    onChange={this.handleChange}
                    type="text"
                    name="username"
                    value={this.state.username ? this.state.username : ""}
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                    disabled
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <FormControl fullWidth={true} size="small" variant="outlined">
                    <InputLabel htmlFor="gender-simple">
                      {<span className="font">{t("user.gender")}</span>}
                    </InputLabel>
                    <Select
                      value={this.state.person ? this.state.person.gender : ""}
                      onChange={(gender) => this.handleChange(gender, "gender")}
                      inputProps={{
                        name: "gender",
                        id: "gender-simple",
                      }}
                    >
                      {genders.map((item) => {
                        return (
                          <MenuItem key={item.id} value={item.id}>
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid className="mb-10" style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="mr-16"
                >
                  {t("general.update")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => this.openPasswordDialog()}
                >
                  {t("user.changePass")}
                </Button>
              </Grid>
            </div>
          </ValidatorForm>
        )}
        {checkHealthOrg && (
          <div>
            <ValidatorForm ref="form" onSubmit={this.handleFormSubmitAdmin}>
              <Grid className="" container spacing={2}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 "
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("EQAHealthOrg.Name")}
                      </span>
                    }
                    onChange={this.handleChange}
                    type="text"
                    name="name"
                    value={name}
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={6} xs={12}>
                  <TextValidator
                    className="w-100 "
                    label={
                      <span className="font">{t("EQAHealthOrg.Code")}</span>
                    }
                    onChange={this.handleChange}
                    disabled={!isManualSetCode}
                    type="text"
                    name="code"
                    value={code}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 "
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("EQAHealthOrg.Address")}
                      </span>
                    }
                    onChange={this.handleChange}
                    type="text"
                    name="address"
                    value={address}
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 "
                    label={
                      <span className="font">
                        {t("EQAHealthOrg.contactPhone")}
                      </span>
                    }
                    onChange={this.handleChange}
                    type="number"
                    name="contactPhone"
                    value={contactPhone ? contactPhone : ""}
                    variant="outlined"
                    size="small"
                    // validators={[ "matchRegexp:^[0-9]*$", "isLengthNumber"]}
                    // errorMessages={[ t("general.errorMessages_phone_number_invalid"),
                    // t("general.errorMessages_phone_number_invalid")]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 "
                    label={
                      <span className="font">
                        <span style={{ color: "red" }}> * </span>
                        {t("EQAHealthOrg.email")}
                      </span>
                    }
                    onChange={this.handleChange}
                    type="text"
                    name="email"
                    value={email ? email : ""}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                      t("general.errorMessages_required"),
                      t("general.errorMessages_email_valid"),
                    ]}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <TextValidator
                    className="w-100 "
                    label={
                      <span className="font">
                        {t("EQAHealthOrg.ContactName")}
                      </span>
                    }
                    onChange={this.handleChange}
                    type="text"
                    name="contactName"
                    value={contactName ? contactName : ""}
                    variant="outlined"
                    size="small"
                    validators={["required"]}
                    errorMessages={[t("general.errorMessages_required")]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <FormControlLabel
                    disabled
                    variant="outlined"
                    size="small"
                    label={
                      <span style={{ fontSize: "115%" }} className="font">
                        {t("EQAHealthOrg.positiveAffirmativeRight")}
                      </span>
                    }
                    control={
                      <Checkbox
                        checked={positiveAffirmativeRight}
                        onChange={
                          (positiveAffirmativeRight) =>
                            this.handleChange(
                              positiveAffirmativeRight,
                              "positiveAffirmativeRight"
                            )
                          // this.handleChange(isFinalResult, 'isFinalResult')
                        }
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Grid className="flex flex-end flex-middle" container spacing={4}>
                <Button variant="contained" color="primary" type="submit" className="mr-16">
                  {t("update")}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={() => this.openPasswordDialog()}
                >
                  {t("user.changePass")}
                </Button>
              </Grid>
            </ValidatorForm>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles({}, { withTheme: true })(UserProfile);
