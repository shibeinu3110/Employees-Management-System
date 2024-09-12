import React, { Component } from "react";
import ConstantList from "../../appConfig";
import {
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  FormHelperText
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getAllEQARound, signUpAndCreateHealthOrg, checkUsername, checkEmail } from "./SessionService";
import { searchByPage as healthOrgSearchByPage } from '../EQAHealthOrg/EQAHealthOrgService';
import { connect } from "react-redux";
import { logoutUser } from "app/redux/actions/UserActions";
import { PropTypes } from "prop-types";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";

class SignUp extends Component {
  handleSignOut = () => { this.props.logoutUser(); };
  constructor(props) {
    super(props);

    getAllEQARound().then((result) => {
      let listEQARound = result.data.content;
      this.setState({ listEQARound: listEQARound });
    });

  }

  state = {
    username: "",
    email: "",
    password: "",
    re_password: "",
    agreement: "",
    eqaRound: null,
    healthOrg: null,
    listEQARound: [],
    hasErrorEQARound: false,
    listHealthOrg: [],
    hasErrorHealthOrg: false,
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

  handleSelectHealthOrg = (itemSelected) => {
    let item = itemSelected.target.value;
    this.setState({ healthOrg: item }, function () {
    });
  }

  handleFormSubmit = event => {
    this.setState({ hasErrorHealthOrg: false, hasErrorEQARound: false });
    if (!this.state.eqaRound || !this.state.eqaRound.id) {
      this.setState({ hasErrorEQARound: true });
    } else {
      let registerDto = {};
      registerDto.healthOrg = this.state.healthOrg;
      registerDto.eqaRound = this.state.eqaRound;
      registerDto.username = this.state.username;
      registerDto.email = this.state.email;
      registerDto.password = this.state.password;
      
      checkUsername(registerDto).then((checkUsername) => {
        if (!checkUsername || !checkUsername.data) {

          checkEmail(registerDto).then((checkEmail) => {
            if (!checkEmail || !checkEmail.data) {

              signUpAndCreateHealthOrg(registerDto).then((result) => {
                if (result && result.data) {
                  alert('Đăng ký thành công.');
                  this.props.history.push('/dashboard/learning-management');
                }
                else {
                  alert('Có lỗi xảy ra khi đăng ký.');
                }
              }, (error) => {
                alert('Có lỗi xảy ra khi đăng ký.');
              });
            }
            else {
              alert('Email đã được sử dụng.');
            }
          }, (error) => {
            alert('Có lỗi xảy ra khi đăng ký.');
          });
        }
        else {
          alert('Username đã được sử dụng.');
        }
      }, (error) => {
        alert('Có lỗi xảy ra khi đăng ký.');
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

    healthOrgSearchByPage({ pageIndex: 0, pageSize: 1000000 }).then(({ data }) => {
      let listHealthOrg = [];
      data.content.forEach(healthOrg => {
        listHealthOrg.push({
          id: healthOrg.id,
          label: healthOrg.name
        })
      });
      this.setState({
        listHealthOrg: listHealthOrg
      })
    });
  }
  componentWillUnmount() {
    // remove rule when it is not needed
    ValidatorForm.removeValidationRule('isPasswordMatch');
  }

  selectHealthOrg = (healthOrg) => {
    this.setState({ healthOrg: healthOrg }, function () {
    });
  }

  render() {
    const { t, i18n } = this.props;
    let searchObject = { pageIndex: 0, pageSize: 1000000 };
    let {
      name,
      code,
      description,
      address,
      healthOrg,
      contactName,
      contactPhone,
      listEQARound,
      eqaRound,
      hasErrorEQARound,
      listHealthOrg,
      hasErrorHealthOrg,
      username,
      email,
      password,
      re_password
    } = this.state;
    return (
      <div className="signup flex flex-center w-100 h-100vh">
        <div className="p-8">
          <Card className="signup-card position-relative y-center">
            <Grid container>
              <Grid item lg={5} md={5} sm={5} xs={12}>
                <div className="p-32 flex flex-center bg-light-gray flex-middle h-100">
                  <img
                    src="/assets/images/illustrations/posting_photo.svg"
                    alt=""
                  />
                </div>
              </Grid>
              <Grid item lg={7} md={7} sm={7} xs={12}>
                <div className="p-36 h-100">
                  <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
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
                    <AsynchronousAutocomplete label={t("sign_up.healthOrg")}
                      searchFunction={healthOrgSearchByPage}
                      searchObject={searchObject}
                      multiple={false}
                      validators={["required"]}
                      errorMessages={t('sign_up.healthOrg_validationMessage')}
                      variant="outlined"
                      className="mb-16 w-100"
                      valueTextValidator={healthOrg}
                      onSelect={this.selectHealthOrg}
                    />
                    <TextValidator
                      className="mb-24 w-100"
                      variant="outlined"
                      label="Email"
                      onChange={this.handleChange}
                      type="email"
                      name="email"
                      value={email}
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "This field is required",
                        "Email is not valid"
                      ]}
                    />
                    <TextValidator
                      className="mb-24 w-100"
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
                      <span className="ml-16 mr-8">or</span>
                      <Button
                        className="capitalize"
                        onClick={this.handleSignOut}
                      >
                        {t("sign_in.title")}
                      </Button>
                    </div>
                  </ValidatorForm>
                </div>
              </Grid>
            </Grid>
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logoutUser: PropTypes.func.isRequired,
});

export default connect(
  mapStateToProps,
  {logoutUser}
)(SignUp);
