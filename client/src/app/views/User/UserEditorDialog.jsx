import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  InputAdornment,
  Checkbox,
  TextField,
  DialogActions,
  FormControlLabel,
  DialogTitle,
  DialogContent,
  TablePagination,
  IconButton,
  Icon
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader
} from "material-table";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getUserByUsername, getUserByEmail, saveUser, addNewUser, getAllRoles, saveHealthOrgByUser, getListHealthOrgByUser } from "./UserService";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import '../../../styles/views/_loadding.scss';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/views/_style.scss';
toast.configure({
  autoClose: 1000,
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
function MaterialButton(props) {
  const item = props.item;
  return (
    <div>
      <IconButton onClick={() => props.onSelect(item, 1)}>
        <Icon color="error">delete</Icon>
      </IconButton>
    </div>
  );
}


class UserEditorDialog extends Component {
  constructor(props) {
    super(props);

    getAllRoles().then((result) => {
      let listRole = result.data;
      this.setState({ listRole: listRole });
    });
  }
  state = {
    isAddNew: false,
    listRole: [],
    isView: false,
    roles: [],
    active: true,
    email: '',
    person: {},
    username: '',
    changePass: true,
    password: '',
    passwordIsMasked: true,
    confirmPassword: '',
    page: 0,
    rowsPerPage: 5,
    selectedHealthOrg: [],
    shouldOpenHealthOrgSearchMultipleDialog: false,
    shouldOpenConfirmationDialog: false,
    loading: false,
  };

  listGender = [
    { id: 'M', name: 'Nam' },
    { id: 'F', name: 'Nữ' },
    { id: 'U', name: 'Không rõ' }
  ]

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    if (source === "changePass") {
      this.setState({ changePass: event.target.checked });
      return;
    }
    if (source === "active") {
      this.setState({ active: event.target.checked });
      return;
    }
    if (source === "displayName") {
      let { person } = this.state;
      person = person ? person : {};
      person.displayName = event.target.value;
      this.setState({ person: person });
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
      [event.target.name]: event.target.value
    });
  };
  togglePasswordMask = () => {
    this.setState(prevState => ({
      passwordIsMasked: !prevState.passwordIsMasked
    }));
  };
  handleFormSubmit = () => {
    this.setState({ loading: true })
    let { id } = this.state;
    let { t } = this.props;
    // this.setState({isView: true});    
    getUserByUsername(this.state.username).then((data) => {
      if (id) {
        if ((data.data && data.data.id && data.data.id !== id)) {
          //alert("Tên đăng nhập đã tồn tại!");
          toast.warning(t("general.duplicateUsername"));
          this.setState({ loading: false });
          return;
        }
      }
      else {
        if ((data.data && data.data.id)) {
          toast.warning(t("general.duplicateUsername"));
          this.setState({ loading: false });
          return;
        }
      }

      // getUserByEmail({email: this.state.email}).then((res) => {
      //   if (id) {
      //     if ((res.data && res.data.id && res.data.id !== id)) {
      //       //alert("Tên đăng nhập đã tồn tại!");
      //       toast.warning(t("general.duplicateEmail"));
      //       this.setState({ loading: false });
      //       return;
      //     }
      //   }
      //   else {
      //     if ((res.data && res.data.id)) {
      //       toast.warning(t("general.duplicateEmail"));
      //       this.setState({ loading: false });
      //       return;
      //     }
      //   }

        if (id) {
          saveUser({
            ...this.state,
          }).then((data) => {
            this.setState({ isView: true, loading: false });
            let healthOrgIdList = [];
            for (let i = 0; i < this.state.selectedHealthOrg.length; i++) {
              const listHealthOrgId = this.state.selectedHealthOrg[i];
              healthOrgIdList.push(listHealthOrgId.id);
            }
            saveHealthOrgByUser(data.data.id, healthOrgIdList).then((response) => {

            });
            toast.success(t("mess_edit"));
            // this.props.handleOKEditClose();
          });
        } else {
          saveUser({
            ...this.state,
          }).then((data) => {
            this.setState({...this.state, isView: true, loading: false });
            let healthOrgIdList = [];
            for (let i = 0; i < this.state.selectedHealthOrg.length; i++) {
              const listHealthOrgId = this.state.selectedHealthOrg[i];
              healthOrgIdList.push(listHealthOrgId.id);
            }
            saveHealthOrgByUser(data.data.id, healthOrgIdList).then((response) => {

            });
            this.state.id = data.data.id;
            this.setState({...this.state, isView: true, loading: false });
            toast.success(t("mess_add"));
            // this.props.handleOKEditClose();
          });
        }
    }).catch(()=>{
      this.setState({ loading: false });
    });
  };

  selectRoles = (rolesSelected) => {
    this.setState({ roles: rolesSelected }, function () {
    });
  }

  componentWillMount() {
    let { open, handleClose, item } = this.props;
    this.setState(item);
  }



  handleHealthOrgSearchDialogClose = () => {
    this.setState({
      shouldOpenHealthOrgSearchMultipleDialog: false,
      shouldOpenConfirmationDialog: false
    });
  };
  handleSelectHealthOrg = item => {
    this.setState({ selectedHealthOrg: item });
    this.handleHealthOrgSearchDialogClose();
  };

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    let { item } = this.props;

    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });

    getAllRoles().then(({ data }) => {
      this.setState({
        listRole: data
      });
    });

    if (item != null && item.id != null) {
      getListHealthOrgByUser(item.id).then(({ data }) => {
        this.setState({
          selectedHealthOrg: data
        })
      });

    }
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage
    });
  };

  handleChangeRowsPerPage = event => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0
    });
  };

  handleDelete = id => {
    let selectedHealthOrg = this.state.selectedHealthOrg;
    selectedHealthOrg = selectedHealthOrg.filter(row => row.id !== id);
    this.setState({
      selectedHealthOrg
    });
  };
  handleDeleteAll = data => {
    const deleteIdList = data.map(row => row.id);
    this.setState({
      deleteIdList,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    const selectedHealthOrg = this.state.selectedHealthOrg.filter(
      row => !this.state.deleteIdList.includes(row.id)
    );
    this.setState({
      selectedHealthOrg,
      shouldOpenConfirmationDialog: false
    });
  };

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    let {
      id,
      isAddNew,
      listRole,
      passwordIsMasked,
      roles,
      active,
      isView,
      email,
      person,
      username,
      changePass,
      password,
      confirmPassword,
      page,
      rowsPerPage,
      selectedHealthOrg,
      shouldOpenHealthOrgSearchMultipleDialog, loading
    } = this.state;



    const currentSelectedHealthOrg = selectedHealthOrg.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
    let columns = [
      { title: t("Name"), field: "name", width: "150",
      headerStyle: {
        minWidth:"250px",
        paddingLeft: "10px",
        paddingRight: "0px",
      },
      cellStyle: {
        minWidth:"250px",
        paddingLeft: "10px",
        paddingRight: "0px",
        textAlign: "left",
      }, 
     },
      { title: t("Code"), field: "code", align: "left", width: "150",
      headerStyle: {
        minWidth:"250px",
        paddingLeft: "10px",
        paddingRight: "0px",
      },
      cellStyle: {
        minWidth:"250px",
        paddingLeft: "10px",
        paddingRight: "0px",
        textAlign: "left",
      }, 
    },
      {
        title: t("Action"),
        field: "custom",
        align: "left",
        width: "250",
        headerStyle: {
          minWidth:"250px",
          paddingLeft: "10px",
          paddingRight: "0px",
        },
        cellStyle: {
          minWidth:"250px",
          paddingLeft: "10px",
          paddingRight: "0px",
          textAlign: "left",
        }, 
        cellStyle: { whiteSpace: "nowrap" },
        render: rowData => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 1) {
                this.handleDelete(rowData.id);
              } else {
                alert("Call Selected Here:" + rowData.id);
              }
            }}
          />
        )
      }
    ];
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth={true}>
        <div className={clsx("wrapperButton", !loading && 'hidden')} >
          <CircularProgress className="buttonProgress" size={24} />
        </div>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <span className="mb-20 styleColor"> {(id ? t("update") : t("Add")) + " " + t("user.title")} </span>
        <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => handleClose()}><Icon color="error"
              title={t("close")}>
              close
        </Icon>
        </IconButton>
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} style={{
          overflowY: "auto",
          display: "flex",
          flexDirection: "column"
        }}>
          <DialogContent dividers>
            <Grid className="mb-16" container spacing={1}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t('user.displayName')}
                    </span>
                  }
                  onChange={displayName => this.handleChange(displayName, "displayName")}
                  type="text"
                  name="name"
                  value={person ? person.displayName : ''}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <FormControl fullWidth={true} variant="outlined"
                  size="small">
                  <InputLabel htmlFor="gender-simple">{<span className="font">{t('user.gender')}</span>}</InputLabel>
                  <Select
                    value={person ? person.gender : ''}
                    onChange={gender => this.handleChange(gender, "gender")}
                    inputProps={{
                      name: "gender",
                      id: "gender-simple"
                    }}
                  >
                    {this.listGender.map(item => {
                      return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  InputProps={{
                    readOnly: !isAddNew,
                  }}
                  className="w-100 mb-16"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>
                      {t('user.username')}
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="username"
                  value={username}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={
                    <span className="font">
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
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                {listRole && (<Autocomplete
                  variant="outlined"
                  size="small"
                  style={{ width: '100%' }}
                  multiple
                  id="combo-box-demo"
                  defaultValue={roles}
                  options={listRole}
                  getOptionSelected={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.authority}
                  onChange={(event, value) => {
                    this.selectRoles(value);
                  }}
                  renderInput={(params) =>
                    <TextValidator
                      {...params}
                      value={roles}
                      label={
                        <span className="font">
                          <span style={{ color: "red" }}> * </span>
                          {t('user.role')}
                        </span>
                      }
                      fullWidth
                      validators={["required"]}
                      errorMessages={[t('user.please_select_permission')]}
                      variant="outlined"
                      size="small"
                    />}
                    
                />)}
              </Grid>



              {!isAddNew && <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControlLabel
                  variant="outlined"
                  size="small"
                  value={changePass}
                  className="mb-16"
                  name="changePass"
                  onChange={changePass => this.handleChange(changePass, "changePass")}
                  control={<Checkbox
                    checked={changePass}
                  />}
                  label={<span className="font">{t("user.changePass")}</span>}
                />
              </Grid>}
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <FormControlLabel
                  variant="outlined"
                  size="small"
                  value={active}
                  className="mb-16"
                  name="active"
                  onChange={active => this.handleChange(active, "active")}
                  control={<Checkbox
                    checked={active}
                  />}
                  label={<span className="font">{t("user.active")}</span>}
                />
              </Grid>
              {
                (changePass != null && changePass == true)
                  ?
                  <Grid container spacing={2}>
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        size="small"
                        className="mb-16 w-100"
                        label={
                          <span className="font">
                            <span style={{ color: "red" }}> * </span>
                            {t('password')}
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
                    <Grid item lg={6} md={6} sm={6} xs={12}>
                      <TextValidator
                        className="mb-16 w-100"
                        label={
                          <span className="font">
                            <span style={{ color: "red" }}> * </span>
                            {t('re_password')}
                          </span>
                        }
                        variant="outlined"
                        size="small"
                        onChange={this.handleChange}
                        name="confirmPassword"
                        type={passwordIsMasked ? "password" : "text"}
                        value={confirmPassword}
                        validators={['required', 'isPasswordMatch']}
                        errorMessages={[t("general.errorMessages_required"), t("general.isPasswordMatch")]}
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
                  </Grid>
                  :
                  <div></div>
              }
              {/* <fieldset style={{ width: "100%" }}>
                <legend>{<span className="font">{t("EQAHealthOrgRoundRegister.orgUnit")}</span>}</legend>
                <Grid item container spacing={3} sm={12} xs={12}>
                  <Grid item xs={12}>
                    <Button
                      className="align-bottom"
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        this.setState({
                          shouldOpenHealthOrgSearchMultipleDialog: true
                        })
                      }
                    >
                      {t("Select")}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <MaterialTable
                      title={t("EQAHealthOrgRoundRegister.listOrgUnit")}
                      columns={columns}
                      data={currentSelectedHealthOrg}
                      // options={{
                      //   selection: true,
                      //   actionsColumnIndex: -1,
                      //   paging: false,
                      //   search: false
                      // }}
                      onSelectionChange={rows => {
                        this.data = rows;
                      }}
                      options={{
                        selection: false,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        rowStyle: (rowData, index) => ({
                          backgroundColor: (index % 2 === 1) ? '#EEE' : '#FFF',
                        }),
                        headerStyle: {
                          backgroundColor: '#358600',
                          color: '#fff',
                        },
                        padding: 'dense',
                        toolbar: false
                      }}
                      localization={{
                        body: {
                          emptyDataSourceMessage: `${t(
                            "general.emptyDataMessageTable"
                          )}`,
                        },
                      }}
                    />

                    <ConfirmationDialog
                      title={t("confirm")}
                      open={this.state.shouldOpenConfirmationDialog}
                      onConfirmDialogClose={this.handleHealthOrgSearchDialogClose}
                      onYesClick={this.handleConfirmationResponse}
                      text={t("DeleteConfirm")}
                      Yes={t("general.Yes")}
                      No={t("general.No")}
                    />

                    <TablePagination
                      align="left"
                      className="px-16"
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      labelRowsPerPage={t('general.rows_per_page')}
                      labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
                      count={selectedHealthOrg.length}
                      rowsPerPage={this.state.rowsPerPage}
                      page={this.state.page}
                      backIconButtonProps={{
                        "aria-label": "Previous Page"
                      }}
                      nextIconButtonProps={{
                        "aria-label": "Next Page"
                      }}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                  </Grid>
                </Grid>
              </fieldset> */}
            </Grid>
          </DialogContent>

          <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.props.handleClose()}>
              {t('Cancel')}
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={loading}
            >
              {t('Save')}
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default UserEditorDialog;
