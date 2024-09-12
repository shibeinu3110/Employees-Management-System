
import ConstantList from "../../appConfig";
import { Grid, MuiThemeProvider, FormControlLabel, TextField, Button, TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog, DialogActions, IconButton, Icon, } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
// import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
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
import AsynchronousAutocomplete from "../utilities/AsynchronousAutocomplete";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import NotificationPopup from '../Component/NotificationPopup/NotificationPopup'
// import SelectMutiSalaryItemPopup from "./../SalaryConfig/SelectMutiSalaryItemPopup"
import moment from "moment";
// import SelectDepartmentPopup from './../SalaryConfig/SelectDepartmentPopup'
// import {createPurchasePlaning, addNewSalaryConfig} from "./../SalaryConfig/SalaryConfigService"
// import { searchByPage as getAll } from "../PurchaseRequestStauts/PurchaseRequestStautsService";
import Autocomplete from '@material-ui/lab/Autocomplete'

import { KeyboardTimePicker, MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardDateTimePicker } from '@material-ui/pickers'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addItem, updateItem } from './ShiftWorkService';

toast.configure({
  autoClose: 2000,
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
  const { t, i18n } = useTranslation();
  const item = props.item;
  const isStatus = props.isStatus
  return <div>
    <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
      <Icon fontSize="small" color="error">delete</Icon>
    </IconButton>
  </div>;
}
class ShiftWorkDialog extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    rowsPerPage: 1000,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenNotificationPopup: false,
    selectedItem: {},
    keyword: '',
    Notification: "",
    planingDate: Date.now(),
    approvedDate: null,
    managementDepartment: null,
    shouldOpenSelectDepartmentPopup: false,
    status: null,
    note: null,
    shouldOpenProductPopup: false,
    product: null,
    salaryConfigItems: [],
    planingDepartment: null,
    listProduct: [],
    type: 1,
    formToDate: moment().endOf('month'),
    formDate: moment().startOf('month'),
    listStatus: [],
    timePeriodsSelect: [],
    timePeriods: [],
    endTime: new Date(),
    startTime: new Date(),
    isTrueTime: false,
    totalHours:0
  };
  PURCHASE = {
    "name": "Đã duyệt",
    indexOrder: 2, //Đã duyệt
  }
  openSelectDepartmentPopup = () => {
    this.setState({
      shouldOpenSelectDepartmentPopup: true,
    })
  }
  handleSelectManagementDepartment = (item) => {
    let department = { id: item.id, name: item.name, }
    this.setState({ department: department }, function () {
      // this.search()
      this.handleSelectDepartmentPopupClose()
    })
  }
  handleSelectDepartmentPopupClose = () => {
    this.setState({
      shouldOpenSelectDepartmentPopup: false,
    })
  }
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
  handleSalaryConfigPopupClose = () => {
    this.setState({ shouldOpenProductPopup: false })
  }
  handleFormSubmit = () => {
    let { id } = this.state;
    let { code } = this.state;
    let { t } = this.props
    if (this.state.timePeriods == null || this.state.timePeriods.length === 0) {
      toast.warning("Chưa chọn thời gian làm việc.")
      return
    }
    if (id) {
      updateItem({
        ...this.state
      }, id).then(() => {
        toast.success("Cập nhật ca làm việc thành công")
        this.props.handleOKEditClose();
      }).catch((err) => {
        toast.success("Có lỗi xảy ra khi cập nhật thông tin ca làm việc");
      })
    } else {
      addItem({
        ...this.state
      }).then((res) => {
        toast.success("Tạo mới ca làm việc thành công")
        this.props.handleOKEditClose();
      }).catch((err) => {
        toast.success("Có lỗi xảy ra khi cập nhật thông tin ca làm việc");
      })
    }
  }
  componentWillMount() {
    let { open, handleClose, item, handleDialogClose, } = this.props;
    if (item.id) {
      //debugger
      this.setState({
        ...item,
        timePeriodsSelect: item.timePeriods
      });

    }
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isMaxDate', (value) => {
      if (value.getTime() > Date.now()) {
        return false;
      }
      return true;
    });
    ValidatorForm.addValidationRule('isTrueTime', (value) => {
      if(value){
        if (this.isTrueTime(this.state.startTime, this.state.endTime)) {
          return true;
        }
        return false;
      }
    });
  }
  isTrueTime = (startTime, endTime) => {
    if (startTime > endTime) {
      return true;
    }
    return false;
  }
  handleChangeDate = (date, name) => {
    let { iteam } = this.state;
    let totalHours =0;
    if (iteam == null) {
      iteam = {};
    }
    iteam[name] = date;
    this.setState({ [name]: date });
    if(this.state.endTime != null && this.state.startTime && name ==="endTime"){
      if(date > this.state.startTime){
        totalHours = (date - this.state.startTime.getTime())/3600000;
        this.setState({totalHours:totalHours});
      }
    }
  }

  handleSelectMultiSalaryConfig = (items) => {
    let { salaryConfigItems } = this.state;
    if (items != null && items.length > 0) {
      let listIdProuct = salaryConfigItems.map(el => el.salaryItem.id);
      if (listIdProuct.indexOf()) {
        items.forEach(item => {
          if (listIdProuct.indexOf(item.salaryItem.id) < 0) { ///check
            salaryConfigItems.push(item);
          }
        })
        this.setState({ salaryConfigItems: salaryConfigItems }, function () {
          this.handleSalaryConfigPopupClose();
        });
      }

    }
  }
  selectedTime = (name, value) => {
    this.setState({
      [name]: value,
    })
  }
  submitTime = () => {
    let { t } = this.props
    var timePeriodsSelect = this.state.timePeriodsSelect;
    var index = 1;
    if (timePeriodsSelect.length === 0) {
      if (!this.state.startTime.getTime() || !this.state.endTime.getTime()) {
        index = 2
      }
      else if (this.state.startTime.getTime() >= this.state.endTime.getTime()) {
        toast.warning("Thời gian bắt đầu không được lớn hơn thời gian kết thúc")
        index = 3;
      }
    }
    else {
      for (var i = 0; i < timePeriodsSelect.length; i++) {
        if (!this.state.startTime.getTime() || !this.state.endTime.getTime()) {
          index = 2;
          // toast.warning(t("maintainRequestStatus.noti.noSelected"))
          break;
        } else if (this.state.startTime.getTime() >= this.state.endTime.getTime()) {
          // toast.warning(t("maintainRequestStatus.noti.selectedFalse"))
          index = 3;
          break;
        } else if (this.state.startTime.getTime() >= timePeriodsSelect[i].startTime.getTime() && this.state.startTime.getTime() <= timePeriodsSelect[i].endTime.getTime()) {
          // toast.warning(t("maintainRequestStatus.noti.dupli_time"))
          index = 4;
          break;
        }
        else if (this.state.endTime.getTime() >= timePeriodsSelect[i].startTime.getTime() && this.state.endTime.getTime() <= timePeriodsSelect[i].endTime.getTime()) {
          // toast.warning(t("maintainRequestStatus.noti.dupli_time"))
          index = 4;
          break;
        }
        else if (this.state.endTime.getTime() >= timePeriodsSelect[i].startTime.getTime() && this.state.startTime.getTime() <= timePeriodsSelect[i].startTime.getTime()) {
          // toast.warning(t("maintainRequestStatus.noti.dupli_time"))
          index = 4;
          break;
        }
        else if (this.state.endTime.getTime() >= timePeriodsSelect[i].endTime.getTime() && this.state.startTime.getTime() <= timePeriodsSelect[i].endTime.getTime()) {
          // toast.warning(t("maintainRequestStatus.noti.dupli_time"))
          index = 4;
          break;
        }
        else {
        }
      }
    }
    if (index === 1) {
      timePeriodsSelect.push({
        startTime: this.state.startTime,
        endTime: this.state.endTime
      })
      this.setState({
        timePeriodsSelect: [...timePeriodsSelect]
      })
    }
    if (index === 4) {
      toast.warning("Thời gian bị trùng");
      return;
    }

  }



  render() {
    const { t, i18n, handleClose, handleSelect, selectedItem, open, handleDialogClose, item } = this.props;
    let { keyword, product, receptionDepartment, productTypeCode, code, name, department, totalHours,isTrueTime,
      status, note, quantity, shouldOpenProductPopup, salaryConfigItems, planingDepartment, managementDepartment, planingDate, shouldOpenNotificationPopup, Notification, approvedDate, shouldOpenSelectDepartmentPopup, timePeriodsSelect, startTime, endTime } = this.state;
    let searchObject = { keyword: '', pageIndex: 0, pageSize: 10000 };
    let now = Date.now();
    let { useStyles } = this.props;
    const classes = useStyles;
    let { iteam } = this.state;
    let isEmpty = true;
    if (iteam == null) {
      iteam = {};
    }
    if (iteam != null && iteam.files != null && iteam.files.length > 0) {
      isEmpty = false;
    }
    let columns = [

      {
        title: t("Thời gian bắt đầu"), field: "startTime", width: "200px",
        headerStyle: {
          paddingLeft: '12px',
          paddingRight: '0px',
        },
        cellStyle: {
          paddingLeft: '7px',
          paddingRight: '0px',
        },
        render: rowData =>
          (rowData.startTime) ? <span>{moment(rowData.startTime).format("DD/MM/YYYY, HH:mm")}</span> : ''
      },
      {
        title: t("Thời gian kết thúc"), field: "endTime", align: "left", width: "200",
        headerStyle: {
          paddingLeft: '12px',
          paddingRight: '0px',
        },
        cellStyle: {
          paddingLeft: '7px',
          paddingRight: '0px',
        },
        render: rowData =>
          (rowData.endTime) ? <span>{moment(rowData.endTime).format("DD/MM/YYYY, HH:mm")}</span> : ''
      },
      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "100px",
        headerStyle: {
          paddingLeft: '0px',
          paddingRight: '0px',
        },
        cellStyle: {
          paddingLeft: '7px',
          paddingRight: '0px',
        },
        render: rowData => <MaterialButton item={rowData} isStatus={this.state.isStatus}
          onSelect={(rowData, method) => {
            // debugger
            if (method === 0) {
            } else if (method === 1) {

              for (let index = 0; index < timePeriodsSelect.length; index++) {
                const item = timePeriodsSelect[index]
                if (
                  rowData &&
                  item
                  //&& rowData.id === item.id
                ) {
                  timePeriodsSelect.splice(index, 1)
                  this.setState({ timePeriodsSelect })
                  break
                }
              }
            } else {
              alert('Call Selected Here:' + rowData.id)
            }
          }}
        />
      },
    ];

    return (

      <Dialog open={open} PaperComponent={PaperComponent} maxWidth={"md"} scroll="paper" fullWidth >
        {shouldOpenNotificationPopup && (
          <NotificationPopup
            title={t('general.noti')}
            open={shouldOpenNotificationPopup}
            // onConfirmDialogClose={this.handleDialogClose}
            onYesClick={this.handleDialogClose}
            text={t(this.state.Notification)}
            agree={t('general.agree')}
          />
        )}
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} class="validator-form-scroll-dialog">
          <DialogTitle style={{ cursor: 'move', marginBottom: '0px', overflow: 'hidden' }} id="draggable-dialog-title">
            {this.state.id ? t("Sửa") : t("Thêm")}
          </DialogTitle>
          <DialogContent style={{ height: '450px', overflow: 'hidden' }}>
            <Grid className="mb-16" container spacing={2}>
              <Grid item md={6} sm={12} xs={12} className="">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    label={<span className={""}><span style={{ color: "red" }}>*</span>{t('Thời gian bắt đầu')}</span>}
                    format="dd/MM/yyyy, HH:mm"
                    margin="normal"
                    id="date-picker-inline"
                    name="startTime"
                    value={startTime}
                    onChange={(startTime) => this.handleChangeDate(startTime, "startTime")}
                    type={isTrueTime ? "startTime" : "datetime"}
                    validators={['required', 'isTrueTime']}
                    invalidDateMessage={"Không đúng định dạng"}
                    errorMessages={[t("general.errorMessages_required"), t("general.isTruePhoneNumer")]}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    inputVariant="outlined"
                    variant="outlined"
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item md={6} sm={12} xs={12} className="">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDateTimePicker
                    label={<span className={""}><span style={{ color: "red" }}>*</span>{t('Thời gian kết thúc')}</span>}
                    format="dd/MM/yyyy, HH:mm"
                    margin="normal"
                    id="date-picker-inline"
                    name="endTime"
                    value={endTime}
                    type={isTrueTime ? "endTime" : "datetime"}
                    validators={['required', 'isTrueTime']}
                    invalidDateMessage={"Không đúng định dạng"}
                    errorMessages={[t("general.errorMessages_required"), t("general.isTruePhoneNumer")]}
                    onChange={(endTime) => this.handleChangeDate(endTime, "endTime")}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    inputVariant="outlined"
                    variant="outlined"
                    size="small"
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid className="" item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={<span><span style={{ color: "red" }}>*</span>{t("Tên")}</span>}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={['required']}
                  errorMessages="Trường này không được để trống"
                />
              </Grid>
              <Grid className="" item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={<span><span style={{ color: "red" }}>*</span>{t("Mã")}</span>}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={['required']}
                  errorMessages="Trường này không được để trống"
                />
              </Grid>
              <Grid className="" item md={3} sm={12} xs={12}>
                <TextValidator
                  className="w-100"
                  label={<span><span style={{ color: "red" }}>*</span>{t("Tổng thời gian")}</span>}
                  onChange={this.handleChange}
                  type="number"
                  name="totalHours"
                  value={totalHours}
                  disabled = {true}
                  validators={['required']}
                  errorMessages="Trường này không được để trống"
                />
              </Grid>
              <Grid className="" item md={1}>
                <Button
                  style={{ float: 'right' }}
                  size="small"
                  className="mt-10"
                  variant="contained"
                  color="primary"
                  onClick={this.submitTime}
                >
                  {t('general.select')}
                </Button>
              </Grid>
              <Grid className="mb-16 mt-16" container spacing={2}>
                <Grid container spacing={2} >
                  <Grid item xs={12}>
                    <MaterialTable
                      data={this.state.timePeriodsSelect ? this.state.timePeriodsSelect : []}
                      columns={columns}
                      options={{
                        toolbar: false,
                        selection: true,
                        actionsColumnIndex: -1,
                        paging: false,
                        search: false,
                        padding: 'dense',
                        rowStyle: (rowData) => ({
                          backgroundColor:
                            rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
                        }),
                        maxBodyHeight: "450px",
                        minBodyHeight: "370px",
                        headerStyle: {
                          backgroundColor: "#358600",
                          color: "#fff",
                        },
                      }}
                      localization={{
                        body: {
                          emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                        }
                      }}
                      components={{
                        Toolbar: props => (
                          <div style={{ witdth: "100%" }}>
                            <MTableToolbar {...props} />
                          </div>
                        ),
                      }}
                      onSelectionChange={(rows) => {
                        this.setState({
                          timePeriods: rows
                        })
                      }}

                    />
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle">
              <Button
                variant="contained"
                color="secondary"
                className="mr-12"
                onClick={() => this.props.handleClose()}
              >

                {t('general.cancel')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                {t('general.save')}
              </Button>

            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog >
    );
  }
}
export default ShiftWorkDialog;