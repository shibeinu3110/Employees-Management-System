import { Fab, Icon, Card, Grid, Divider, Button, DialogActions, Dialog, TextField } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import DateFnsUtils from "@date-io/date-fns";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { Breadcrumb, SimpleCard, EgretProgressBar } from "egret";
import axios from "axios";
import ConstantList from "../../appConfig";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import JwtAuthService from "../../services/jwtAuthService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/views/_style.scss';


toast.configure({
  autoClose: 3000,
  draggable: false,
  limit: 3
});
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class ChangePasswordPopup extends React.Component {

  // handleChange = (prop) => (event) => {
  //   this.setState()
  // };
  state = {
    oldPassword: '',
    password: '',
    confirmPassword: ''
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false
      }
      return true
    })
  }
  async handleChangePassword(user, handleClose) {
    let { t } = this.props;
    user.password = this.state.password;
    user.oldPassword = this.state.oldPassword;
    user.confirmPassword = this.state.confirmPassword;
    const url = ConstantList.API_ENPOINT + "/api/users/password/self";
    let isChangedOK = false;

    await axios.put(url, user).then(response => {
      // console.log(response);
      isChangedOK = true;
      toast.success(t('general.success_update_password'));
      // alert('Bạn đã đối mật khẩu thành công');//Thay bằng thông báo thành công chuẩn
    }).catch(err => {
      toast.warning("general.errorMessages_update_password");
      // alert('Có lỗi trong quá trình đổi mật khẩu');//Thay bằng thông báo lỗi chuẩn
      this.setState({ errorMessage: err.message });
    })
    if (isChangedOK) {
      await JwtAuthService.logout();
    }
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  render() {
    const { t, i18n, handleClose, handleSelect, selectedItem, open, user } = this.props;
    return (
      <Dialog onClose={handleClose} open={open} PaperProps={{
        style: {
          width: 500,
          maxHeight: 800,
          alignContent: 'center'
          //backgroundColor: 'Blue',
          //color:'black'
        },
      }} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth={true} >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="styleColor">{t("user.changePass")}</span>
        </DialogTitle>
        <ValidatorForm ref="form">
          <DialogContent>
            <Grid container spacing={1}>
              <Grid item md={12} sm={12} xs={12}>
                <FormControl fullWidth margin="dense">
                  <TextValidator
                    label={<span className="font"><span style={{ color: "red" }}> * </span>{t('user.current_password')}</span>}
                    id="password-current"
                    className="w-100"
                    size="small"
                    variant="outlined"
                    name="oldPassword"
                    type="password"
                    value={this.state.oldPassword}
                    onChange={this.handleChange('oldPassword')}
                    validators={['required']}
                    errorMessages={[t("general.errorMessages_required")]}
                  />
                </FormControl>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <FormControl fullWidth margin="dense">
                  <TextValidator
                    label={<span className="font"><span style={{ color: "red" }}> * </span>{t('user.pass')}</span>}
                    id="password-current"
                    size = "small"
                    variant = "outlined"
                    className="w-100"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    validators={['required']}
                    errorMessages={[t("general.errorMessages_required")]}
                  />
                </FormControl>
              </Grid>

              <Grid item md={12} sm={12} xs={12}>
                <FormControl fullWidth margin="dense">
                  <TextValidator
                    label={<span className="font"><span style={{ color: "red" }}> * </span>{t('user.confirm_password')}</span>}
                    size = "small"
                    variant = "outlined"
                    id="confirm-password"
                    className="w-100"
                    name="confirmPassword"
                    type="password"
                    value={this.state.confirmPassword}
                    onChange={this.handleChange('confirmPassword')}
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={[
                      t("general.errorMessages_required"),
                      t("general.isPasswordMatch"),
                    ]}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              className="mb-16 mr-8 align-bottom"
              variant="contained"
              color="secondary"
              onClick={() => handleClose()}>{t('general.cancel')}
            </Button>
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.handleChangePassword(user, handleClose)}>{t('general.update')}
            </Button>
          </DialogActions>
        </ValidatorForm>

      </Dialog>
    );
  }
}
export default ChangePasswordPopup;