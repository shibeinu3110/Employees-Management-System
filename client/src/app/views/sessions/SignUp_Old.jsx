import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Select,
  Input,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getAllEQARound, getAllHealthOrgType, signUpAndCreateHealthOrg } from "./SessionService";
import { connect } from "react-redux";

class SignUp extends Component {
  constructor(props) {
    super(props);

    getAllEQARound().then((result) => {
      let listEQARound = result.data.content;
      this.setState({ listEQARound: listEQARound });
    });

    getAllHealthOrgType().then((result) => {
      let listHealthOrgType = result.data.content;
      this.setState({ listHealthOrgType: listHealthOrgType });
    });
  }

  state = {
    username: "",
    email: "",
    password: "",
    re_password: "",
    agreement: "",
    eqaRound: null,
    healthOrgType: null,
    listEQARound: [],
    hasErrorEQARound: false,
    listHealthOrgType: [],
    hasErrorHealthOrgType: false,
  };

  handleChange = event => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSelectEQARound = (itemSelected) => {
    let item = itemSelected.target.value;
    this.setState({ eqaRound: item }, function () {
    });
  }

  handleSelectHealthOrgType = (itemSelected) => {
    let item = itemSelected.target.value;
    this.setState({ healthOrgType: item }, function () {
    });
  }

  handleFormSubmit = event => {
    this.setState({ hasErrorHealthOrgType: false, hasErrorEQARound: false });
    if (!this.state.eqaRound || !this.state.eqaRound.id) {
      this.setState({ hasErrorEQARound: true });
    }
    else if (!this.state.healthOrgType || !this.state.healthOrgType.id) {
      this.setState({ hasErrorHealthOrgType: true });
    } else {
      let registerDto = {};
      let healthOrg = {};
      healthOrg.healthOrgType = this.state.healthOrgType;
      healthOrg.code = this.state.code;
      healthOrg.name = this.state.name;
      healthOrg.contactName = this.state.contactName;
      healthOrg.contactPhone = this.state.contactPhone;
      healthOrg.description = this.state.description;
      healthOrg.address = this.state.address;

      registerDto.healthOrg = healthOrg;
      registerDto.eqaRound = this.state.eqaRound;
      registerDto.username = this.state.username;
      registerDto.email = this.state.email;
      registerDto.password = this.state.password;
      signUpAndCreateHealthOrg(registerDto).then((result) => {
        if (result != null) {
          alert('Đăng ký thành công.');
          this.props.history.push('/dashboard/learning-management');
        }
        else {
          alert('Username hoặc email trùng hoặc có lỗi xảy ra khi đăng ký.');
        }
      });
    }
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }
  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  render() {
    const { t, i18n } = this.props;
    let {
      healthOrg,
      name,
      code,
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
      re_password
    } = this.state;
    return (
      <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} >
        <div className="signup flex flex-center w-100 h-100vh">
          <div className="p-8">
            <Card className="signup-card-custommer position-relative y-center">
              <Grid container>
                <Grid item lg={2} md={2} sm={2} xs={12}>
                  <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                    <img
                      src="/assets/images/illustrations/posting_photo.svg"
                      alt=""
                    />
                  </div>
                </Grid>
                <Grid item lg={10} md={10} sm={10} xs={12} container spacing={2}>

                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div className="pl-36 pt-36 pr-36 h-100">
                      <div className="mb-16">
                        <h4 className="text-center">{t('sign_up.info_login')}</h4>
                      </div>
                      <FormControl variant="outlined" fullWidth={true} error={hasErrorEQARound} className="mb-16 w-100">
                        <InputLabel htmlFor="eQARound-simple">{t('sign_up.eqaRound')}</InputLabel>
                        <Select
                          labelId="eQARound-simple"
                          label={t('EQARound.title')}
                          value={eqaRound ? eqaRound : ''}
                          onChange={value => this.handleSelectEQARound(value)}
                          required={true}
                        >
                          {listEQARound.map(item => {
                            return <MenuItem key={item.id} value={item}>{item.name}</MenuItem>;
                          })}
                        </Select>
                        {hasErrorEQARound && <FormHelperText>This is required!</FormHelperText>}
                      </FormControl>
                      <TextValidator
                        className="mb-16 w-100"
                        variant="outlined"
                        label="Email"
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        value={email}
                        validators={["required", "isEmail"]}
                        errorMessages={[
                          "This field is required",
                          "email is not valid"
                        ]}
                      />
                      <TextValidator
                        className="mb-16 w-100"
                        variant="outlined"
                        label={t('username')}
                        onChange={this.handleChange}
                        type="text"
                        name="username"
                        value={username}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />
                      <TextValidator
                        className="mb-16 w-100"
                        label={t('password')}
                        variant="outlined"
                        onChange={this.handleChange}
                        name="password"
                        type="password"
                        value={password}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />
                      <TextValidator
                        className="mb-16 w-100"
                        label={t('re_password')}
                        variant="outlined"
                        onChange={this.handleChange}
                        name="re_password"
                        type="password"
                        value={re_password}
                        validators={['isPasswordMatch', 'required']}
                        errorMessages={['Password mismatch', 'This field is required']}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div className="pl-36 pt-36 pr-36 h-100">
                      <div className="mb-16">
                        <h4 className="text-center">{t('sign_up.info_eqa_health_org')}</h4>
                      </div>
                      <FormControl variant="outlined" fullWidth={true} error={hasErrorHealthOrgType} className="mb-16 w-100">
                        <InputLabel htmlFor="healthOrgType-simple">{t("EQAHealthOrg.HealthOrgType")}</InputLabel>
                        <Select
                          labelId="healthOrgType-simple"
                          label={t("EQAHealthOrg.HealthOrgType")}
                          value={healthOrgType ? healthOrgType : ''}
                          onChange={value => this.handleSelectHealthOrgType(value)}
                          required={true}
                        >
                          {listHealthOrgType.map(item => {
                            return <MenuItem key={item.id} value={item}>{item.name}</MenuItem>;
                          })}
                        </Select>
                        {hasErrorHealthOrgType && <FormHelperText>This is required!</FormHelperText>}
                      </FormControl>
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16"
                        label={t("EQAHealthOrg.Code")}
                        onChange={this.handleChange}
                        type="text"
                        name="code"
                        value={code}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />
                      <TextValidator
                        className="w-100 mb-16"
                        variant="outlined"
                        label={t("EQAHealthOrg.Name")}
                        onChange={this.handleChange}
                        type="text"
                        name="name"
                        value={name}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16"
                        label={t("EQAHealthOrg.ContactName")}
                        onChange={this.handleChange}
                        type="text"
                        name="contactName"
                        value={contactName}
                        validators={["required"]}
                        errorMessages={["This field is required"]}
                      />
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16"
                        label={t("EQAHealthOrg.ContactPhone")}
                        onChange={this.handleChange}
                        type="text"
                        name="contactPhone"
                        value={contactPhone}
                      />
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16"
                        label={t("EQAHealthOrg.Description")}
                        onChange={this.handleChange}
                        name="description"
                        value={description}
                      />
                      <TextValidator
                        variant="outlined"
                        className="w-100 mb-16"
                        label={t("EQAHealthOrg.Address")}
                        onChange={this.handleChange}
                        name="address"
                        value={address}
                      />
                    </div>
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={12}>
                    <div className="pl-36 pr-36 pb-36 h-100">
                      <FormControlLabel
                        className="mb-16"
                        name="agreement"
                        onChange={this.handleChange}
                        control={<Checkbox />}
                        label={t("sign_up.valid_checkbox")}
                      />
                      <div className="flex flex-middle">
                        <Button
                          className="capitalize"
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          {t("sign_up.title")}
                        </Button>
                        <span className="ml-16 mr-8">{t("or")}</span>
                        <Button
                          className="capitalize"
                          onClick={() =>
                            this.props.history.push(ConstantList.ROOT_PATH + "session/signin")
                          }
                        >
                          {t("sign_in.title")}
                        </Button>
                      </div>
                    </div>
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

export default connect(
  mapStateToProps,
  {}
)(SignUp);
