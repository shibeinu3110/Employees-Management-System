import {
  Grid,
  DialogActions,
  MuiThemeProvider,
  TextField,
  Button, IconButton,
  Icon,
  TableHead,
  TableCell,
  TableRow,
  Checkbox, InputAdornment,
  TablePagination,
  Radio,
  Dialog
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader
} from "material-table";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { getAllByRoot, saveItem, getAllRoles, getItemById } from "./MenuService";
import { Link } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import NotificationPopup from "../Component/NotificationPopup/NotificationPopup";
import SelectParentPopup from "./SelectParentPopup";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../../styles/views/_style.scss';
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit: 3
});
function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
class SupplierDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    path: "",
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectedItem: {},
    keyword: "",
    shouldOpenNotificationPopup: false,
    shouldOpenSelectParentPopup: false,
    roles: [],
    listRole: []
  };

  setPage = page => {
    this.setState({ page }, function () {
      this.updatePageData();
    });
  };

  handleChangeCommonObjectType = (event, source) => {
    let { commonObjectTypes } = this.state;
    this.setState({
      type: commonObjectTypes.find(item => item.id === event.target.value),
      typeId: event.target.value
    });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 });
    this.updatePageData();
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  updatePageData = () => {
    var searchObject = {};
    searchObject.pageIndex = this.state.page;
    searchObject.pageSize = this.state.rowsPerPage;
    getAllByRoot().then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements
      });
    });
  };

  componentDidMount() {
    getAllRoles().then(({ data }) => {
      this.setState({
        listRole: data
      });
    });
  }

  handleClick = (event, item) => {
    //alert(item);
    if (item.id != null) {
      this.setState({ selectedValue: item.id, selectedItem: item });
    } else {
      this.setState({ selectedValue: item.id, selectedItem: null });
    }
  };

  componentWillMount() {
    let { item } = this.props;
    this.setState({ item: item });
    this.setState({ ...item }, () => {
      let { type } = this.state;
      if (type && type.id) {
        this.setState({ typeId: type.id });
      }
    });
    // getAllRoles().then(({ data }) => {
    //   debugger
    //     this.setState({
    //       listRole: data,
    //     })
    //   })
    //   console.log(this.state.listRole);
  }
  search = keyword => {
    var searchObject = {};
    searchObject.text = keyword;
    searchObject.pageIndex = this.state.page;
    searchObject.pageSize = this.state.rowsPerPage;
    getAllByRoot().then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements
      });
    });
  };

  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }
  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };
  handleChangeCode = event => {
    this.setState({ code: event.target.value });
  };

  handleChangePath = event => {
    this.setState({ path: event.target.value });
  };

  handleChangeValue = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openParentPopup = event => {
    this.setState({ shouldOpenSelectParentPopup: true });
  };

  handleSelectParent = itemParent => {
    let { t } = this.props
    let { id } = this.state;
    let { code, parent } = this.state;
    let idClone = id;
    let { item } = this.state
    if (id) {

      let isCheck = false;
      let parentClone = itemParent;
      let children = item;
      // if()
      if (children.parentId === null && children.id == parentClone.id) {
        isCheck = true;
      }
      while (parentClone != null) {
        if (parentClone.id == children.id) {
          isCheck = true;
          break;
        } else {
          parentClone = parentClone.parent
        }
      }
      if (isCheck) {
        toast.warning(t("user.warning_parent"))
        return
      }
    }
    //alert(parent.name);
    this.setState({ parent: itemParent });
    this.setState({ shouldOpenSelectParentPopup: false });
    //this.setState({shouldOpenSelectParentPopup:true});
  };

  handleFormSubmit = () => {
    let { id } = this.state;
    let { t } = this.props;
    let { code, parent } = this.state;
    let idClone = id;
    // debugger

    // let item = this.state;

    let item = {};
    item.id = this.state.id;
    item.name = this.state.name;
    item.code = this.state.code;
    item.viewIndex = this.state.viewIndex;
    item.icon = this.state.icon;
    item.path = this.state.path;
    if (this.state.parent == null) {
      item.parent = {}
    } else {
      item.parent = this.state.parent;
    }

    item.roles = this.state.roles;
    item.description = this.state.description;
    // item.roles=[];
    // if(this.state.roles!=null){
    //   this.state.roles.forEach(e=>{
    //     var menuRole ={};
    //     menuRole.role={};
    //     menuRole.role.id = e.id;
    //     item.roles.push(menuRole);
    //   })
    // }
    if (id) {
      saveItem(item).then(() => {
        this.props.handleOKEditClose();
        toast.success(t("mess_edit"));
      });
    } else {
      saveItem(item).then(() => {
        this.props.handleOKEditClose();
        toast.success(t("mess_add"));
      });
    }

  };
  handleDialogClose = () => {
    this.setState({
      shouldOpenNotificationPopup: false,
      shouldOpenSelectParentPopup: false
    });
  };

  selectRoles = rolesSelected => {
    this.setState({ roles: rolesSelected }, function () { });
  };

  render() {
    const {
      t,
      i18n,
      handleClose,
      handleSelect,
      selectedItem,
      open,
      item
    } = this.props;
    let {
      keyword,
      id,
      name,
      code,
      icon,
      path,
      viewIndex,
      shouldOpenNotificationPopup,
      listRole,
      roles,
      description
    } = this.state;
    let columns = [
      { title: t("menu.name"), field: "name", width: "150",
      headerStyle: {
        minWidth:"150px",
        paddingLeft: "10px",
        paddingRight: "0px",
      },
      cellStyle: {
        minWidth:"150px",
        paddingLeft: "10px",
        paddingRight: "0px",
        textAlign: "left",
      }, 
     },
      { title: t("menu.code"), field: "code", align: "left", width: "150",
      headerStyle: {
        minWidth:"150px",
        paddingLeft: "10px",
        paddingRight: "0px",
      },
      cellStyle: {
        minWidth:"150px",
        paddingLeft: "10px",
        paddingRight: "0px",
        textAlign: "left",
      }, 
     },

      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "250",
        headerStyle: {
          minWidth:"150px",
          paddingLeft: "10px",
          paddingRight: "0px",
        },
        cellStyle: {
          minWidth:"150px",
          paddingLeft: "10px",
          paddingRight: "0px",
          textAlign: "left",
        }, 
        render: rowData => (
          <Radio
            name="radSelected"
            value={rowData.id}
            checked={this.state.selectedValue === rowData.id}
            onClick={event => this.handleClick(event, rowData)}
          />
        )
      }
    ];
    return (
      <Dialog
        open={open}
        PaperComponent={PaperComponent}
        maxWidth="md"
        fullWidth={true}
      >
        {shouldOpenNotificationPopup && (
          <NotificationPopup
            title={t("general.noti")}
            open={shouldOpenNotificationPopup}
            // onConfirmDialogClose={this.handleDialogClose}
            onYesClick={this.handleDialogClose}
            text={t(this.state.Notification)}
            agree={t("general.agree")}
          />
        )}
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <span className="mb-20 styleColor"> {(id ? t("update") : t("Add"))} </span>
          <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => handleClose()}><Icon color="error"
              title={t("close")}>
              close
            </Icon>
          </IconButton>
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                {/* <Button
                  size="small"
                  style={{ float: "right" }}
                  className=" mt-16"
                  variant="contained"
                  color="primary"
                  onClick={this.openParentPopup}
                >
                  {t("general.select")}
                </Button> */}
                  <TextValidator
                    className="w-100 stylePlaceholder"
                    // style ={{width:"75%"}}
                    size="small"
                    label = {<span className="font">{t("menu.parent")}</span>}
                    variant="outlined"
                    type="text"
                    value={this.state.parent != null ? this.state.parent.description : ""}
                    placeholder={t("menu.parent")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Button
                            size="small"
                            // style={{ float: "right" }}
                            // className=" mt-16"
                            variant="contained"
                            color="primary"
                            onClick={this.openParentPopup}
                          >
                            {t("general.select")}
                          </Button>
                        </InputAdornment>
                      ),
                    }}
                    // startAdornment={
                    //   <InputAdornment>
                    //    {this.state.parent !=null && (<Link to="#">
                    //       <IconButton size="small" style={{
                    //           position: "absolute",
                    //           top: "0",
                    //           right: "0"
                    //         }}
                    //         onClick ={()=>{
                    //           this.setState({parent:null})
                    //         }}
                    //         >
                    //             <Icon fontSize="small" >close</Icon>
                    //         </IconButton>
                    //     </Link>)}
                    //   </InputAdornment>
                    // }
                  />
                {this.state.shouldOpenSelectParentPopup && (
                  <SelectParentPopup
                    open={this.state.shouldOpenSelectParentPopup}
                    handleSelect={this.handleSelectParent}
                    selectedItem={
                      this.state.item != null && this.state.item.parent != null
                        ? this.state.item.parent
                        : {}
                    }
                    handleClose={this.handleDialogClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
              </Grid>

              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className = "font">
                      <span style={{ color: "red" }}> * </span>
                      {t("menu.key")}
                    </span>
                  }
                  onChange={this.handleChangeValue}
                  type="text"
                  name="name"
                  size = "small"
                  variant = "outlined"
                  value={name}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>

                      {t("menu.code")}
                    </span>
                  }
                  onChange={this.handleChangeValue}
                  type="text"
                  size = "small"
                  variant = "outlined"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>

                      {t("menu.icon")}
                    </span>
                  }
                  onChange={this.handleChangeValue}
                  type="text"
                  name="icon"
                  size = "small"
                  variant = "outlined"
                  value={icon}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>

                      {t("menu.path")}
                    </span>
                  }
                  onChange={this.handleChangeValue}
                  type="text"
                  name="path"
                  size = "small"
                  variant = "outlined"
                  value={path}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={
                    <span className="font">
                      <span style={{ color: "red" }}> * </span>

                      {t("menu.description")}
                    </span>
                  }
                  onChange={this.handleChangeValue}
                  type="text"
                  size = "small"
                  variant = "outlined"
                  name="description"
                  value={description}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                {listRole && (
                  <Autocomplete
                    style={{ width: "100%" }}
                    multiple
                    id="combo-box-demo"
                    defaultValue={roles}
                    options={listRole}
                    getOptionSelected={(option, value) =>
                      option.id === value.id
                    }
                    getOptionLabel={option => option.authority}
                    onChange={(event, value) => {
                      this.selectRoles(value);
                    }}
                    renderInput={params => (
                      <TextValidator
                        {...params}
                        value={roles}
                        // label={t('user.role')}
                        label={
                          <span className="font">
                            <span style={{ color: "red" }}>*</span>
                            {t("user.role")}
                          </span>
                        }
                        size = "small"
                        variant = "outlined"
                        fullWidth
                        validators={["required"]}
                        errorMessages={[t("user.please_select_permission")]}
                      />
                    )}
                  />
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle mt-10">
              <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                {t("general.cancel")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "15px" }}
                type="submit"
              >
                {t("general.save")}
              </Button>
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}
export default SupplierDialog;
