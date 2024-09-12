import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  InputAdornment,
  Select,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText,
  IconButton,
  Icon
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import {
  getAllEQARound,
  getAllHealthOrgType,
  signUpAndCreateHealthOrg,
  checkUsername,
  checkEmail
} from "./SessionService";
import UploadFile from "../utilities/UploadFile";
import { connect } from "react-redux";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

toast.configure();
// function CheckBoxLable() {
//   const { t, i18n } = useTranslation();
//   return (
//     <span>
//       {t("sign_up.valid_checkbox_title")}{" "}
//       <i>
//         <b> {t("sign_up.valid_checkbox_content")} </b>
//       </i>
//     </span>
//   );
// }

class SignUp extends Component {
  constructor(props) {
    super(props);

    // getAllEQARound().then((result) => {
    //   let listEQARound = result.data.content;
    //   this.setState({ listEQARound: listEQARound });
    // });

    // getAllHealthOrgType().then((result) => {
    //   let listHealthOrgType = result.data.content;
    //   this.setState({ listHealthOrgType: listHealthOrgType });
    // });
  }

  state = {
    username: "",
    email: "",
    password: "",
    re_password: "",
    agreement: false,
    confirmPassword: "",
    isView: true,
    eqaRound: null,
    healthOrgType: null,
    //listEQARound: [],
    hasErrorEQARound: false,
    //listHealthOrgType: [],
    hasErrorHealthOrgType: false,
    shouldOpenSignupSuccessDialog: false,
    passwordIsMasked: true,
    confirmPasswordIsMasked: true
  };

  handleChange = (event, source) => {
    event.persist();
    if(source === "checkbox"){
      this.setState({isView: !event.target.checked, agreement: event.target.checked });
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectEQARound = itemSelected => {
    let item = itemSelected.target.value;
    this.setState({ eqaRound: item }, function() {});
  };

  handleSelectHealthOrgType = itemSelected => {
    let item = itemSelected.target.value;
    this.setState({ healthOrgType: item }, function() {});
  };

  handleFormSubmit = event => {
    let registerDto = {};
    let { t } = this.props;
    let { password, re_password} = this.state;
    registerDto.email = this.state.email.trim();
    registerDto.username = this.state.email.trim();
    if(password.length < 8 && re_password.length < 8){
      toast.warning(t("sign_up.weak_password"));
      return
    }else{
      if(password !== re_password){
        toast.warning(t("sign_up.duplicate_pass"));
        return
      }
    }
    checkUsername(registerDto).then(
      result => {
        if (result && result.data && result.data != "") {
          toast.error(t("sign_up.duplicate_email"));
        } else {
          checkEmail(registerDto).then(
            result => {
              if (result && result.data && result.data != "") {
                toast.error(t("sign_up.duplicate_email"));
              } else {
                signUpAndCreateHealthOrg(this.state).then(result => {
                  if (
                    result != null &&
                    result.data != null &&
                    result.data != ""
                  ) {
                    if (result.data.duplicateEmail) {
                      toast.error(t("sign_up.duplicate_email"));
                    } else if (result.data.sendEmailFailed) {
                      toast.error(t("sign_up.error_email"));
                    }
                  } else {
                    toast.error(t("sign_up.error_signup"));
                  }

                  toast.success(t("mess_SignUp"));
                  this.props.history.push("/session/signin");
                });
              }
            },
            error => {
              // alert('Có lỗi xảy ra khi đăng ký.');
              toast.error(t("sign_up.error_signup"));
            }
          );
        }
      },
      error => {
        // alert('Có lỗi xảy ra khi đăng ký.');
        toast.error(t("sign_up.error_signup"));
      }
    );
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule("isLengthNumber", value => {
      if (value.length > 10) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };

  toggleConfirmPasswordMask = () => {
    this.setState(prevState => ({
      confirmPasswordIsMasked: !prevState.confirmPasswordIsMasked
    }));
  };

  render() {
    const { t, i18n } = this.props;
    let {
      fax,
      officerPosion,
      unitCodeOfProgramPEQAS,
      name,
      taxCodeOfTheUnit,
      description,
      address,
      healthOrgType,
      contactName,
      contactPhone,
      listEQARound,
      eqaRound,
      hasErrorEQARound,
      listHealthOrgType,
      hasErrorHealthOrgType,
      username,
      email,
      password,
      isView,
      //confirmPassword,
      re_password,
      passwordIsMasked,
      confirmPasswordIsMasked
    } = this.state;

    return (
      <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
        <div className="signup flex flex-center w-100 h-100vh">
          <div className="p-8">
            <Card className="signup-card-customs position-relative y-center">
              <Grid container>
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                    <img
                      src="/assets/images/illustrations/posting_photo.svg"
                      alt=""
                    />
                  </div>
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={12}>
                  <Grid container spacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div className="pt-16">
                        <h4 className="text-center">
                          {t("sign_up.title_form")}
                        </h4>
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12} className="m-16">
                    <Grid container spacing={2}>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          className="w-100"
                          variant="outlined"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.healthOrgName")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="name"
                          value={name}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          className="w-100"
                          variant="outlined"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("Email")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="email"
                          name="email"
                          value={email}
                          validators={["required", "isEmail"]}
                          errorMessages={[
                            t("general.errorMessages_required"),
                            t("general.errorMessages_email_valid")
                          ]}
                        />
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.taxCodeOfTheUnit")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="taxCodeOfTheUnit"
                          value={taxCodeOfTheUnit}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                        />
                      </Grid>

                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.unitCodeOfProgramPEQAS")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="unitCodeOfProgramPEQAS"
                          value={unitCodeOfProgramPEQAS}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.contactName")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="contactName"
                          value={contactName}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.officerPosion")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="officerPosion"
                          value={officerPosion}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.contactPhone")}
                          </span>
                          }
                          onChange={this.handleChange}
                          type="text"
                          name="contactPhone"
                          value={contactPhone}
                          validators={["required", "matchRegexp:^[0-9]*$", "isLengthNumber"]}
                          errorMessages={[
                            t("general.errorMessages_required"),
                            t("general.errorMessages_phone_number_invalid"),
                            t("general.errorMessages_phone_number_invalid")
                          ]}
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={t("sign_up.fax")}
                          onChange={this.handleChange}
                          type="text"
                          name="fax"
                          value={fax}
                        />
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <TextValidator
                          size="small"
                          variant="outlined"
                          className="w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("sign_up.address")}
                          </span>
                          }
                          onChange={this.handleChange}
                          name="address"
                          value={address}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                        />
                      </Grid>

                      <Grid item sm={6} xs={12}>
                        <TextValidator
                          className="mb-16 w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("password")}
                          </span>
                          }
                          variant="outlined"
                          onChange={this.handleChange}
                          name="password"
                          type={passwordIsMasked ? "password" : "text"}
                          value={password}
                          validators={["required"]}
                          errorMessages={[t("general.errorMessages_required")]}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={this.togglePasswordMask}>
                                  {passwordIsMasked ? (
                                    <Icon
                                      color="primary"
                                      title={t("show_password")}
                                    >
                                      visibility_off
                                    </Icon>
                                  ) : (
                                    <Icon
                                      color="primary"
                                      title={t("hide_password")}
                                    >
                                      visibility
                                    </Icon>
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <TextValidator
                          className="mb-16 w-100"
                          label={
                          <span>
                            <span style={{ color: "red" }}> * </span>
                            {t("re_password")}
                          </span>
                          }
                          variant="outlined"
                          onChange={this.handleChange}
                          name="re_password"
                          type={confirmPasswordIsMasked ? "password" : "text"}
                          value={re_password}
                          validators={["required", "isPasswordMatch"]}
                          errorMessages={[
                            t("general.errorMessages_required"),
                            t("general.isPasswordMatch")
                          ]}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={this.toggleConfirmPasswordMask}
                                >
                                  {confirmPasswordIsMasked ? (
                                    <Icon
                                      color="primary"
                                      title={t("show_password")}
                                    >
                                      visibility_off
                                    </Icon>
                                  ) : (
                                    <Icon
                                      color="primary"
                                      title={t("hide_password")}
                                    >
                                      visibility
                                    </Icon>
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                      </Grid>

                      {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                        <UploadFile
                        />
                      </Grid> */}
                    </Grid>

                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <div>
                        {/* <FormControlLabel
                          className="w-100 mt-16"
                          name="agreement"
                          onChange={event => this.handleChange(event, "checkbox")}
                          control={<Checkbox />}
                          label={<CheckBoxLable />}
                        /> */}
                        <div className="flex flex-middle mt-16">
                          <Button
                            className="capitalize "
                            variant="contained"
                            color="primary"
                            // disabled= {isView}
                            type="submit"
                          >
                            {t("sign_up.title")}
                          </Button>
                          <span className="ml-16 mr-8">{t("or")}</span>
                          <Button
                            className="capitalize"
                            variant="contained"
                            onClick={() =>
                              this.props.history.push(
                                ConstantList.ROOT_PATH + "session/signin"
                              )
                            }
                          >
                            {t("sign_in.title")}
                          </Button>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        </div>
      </ValidatorForm>
    );
  }
}

const mapStateToProps = state => ({
  // setUser: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {})(SignUp);
