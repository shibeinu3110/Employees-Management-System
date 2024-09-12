import { Grid, DialogActions, MuiThemeProvider, TextField, Button, TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { getByPage, saveItem, checkCode } from "./CommonObjectService";
import {searchByPage} from "./../CommonObjectType/CommonObjectTypeService";
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
import NotificationPopup from '../Component/NotificationPopup/NotificationPopup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit:3
  //etc you get the idea
});
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class CommonObjectDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectedItem: {},
    commonObjectTypes: [],
    type: {},
    keyword: '',
    shouldOpenNotificationPopup:false,
    Notification:"",
  };
  handleDialogClose =()=>{
    this.setState({shouldOpenNotificationPopup:false,})
  }

  setPage = page => {
    this.setState({ page }, function () {
      this.updatePageData();
    })
  };
  handleChangeCommonObjectType = (event, source) => {
    let {commonObjectTypes} = this.state;
    this.setState({
      type: commonObjectTypes.find((item) => item.id === event.target.value),
      typeId: event.target.value
    });
  }

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
    getByPage(searchObject).then(({ data }) => {
      this.setState({ itemList: [...data.content], totalElements: data.totalElements })
    }
    );
  };

  componentDidMount() {
    // this.updatePageData(this.state.page, this.state.rowsPerPage);
  }

  handleClick = (event, item) => {
    //alert(item);
    if (item.id != null) {
      this.setState({ selectedValue: item.id, selectedItem: item });
    } else {
      this.setState({ selectedValue: item.id, selectedItem: null });
    }

  }
  componentWillMount() {
    searchByPage(null, 0, 1000).then(({data}) => {
      let commonObjectTypes = data.content;
      this.setState({commonObjectTypes});
    });
    let {item} = this.props;
    this.setState({...item}, () => {
      let {type} = this.state;
      if(type && type.id){
        this.setState({typeId: type.id});
      }
    });
  }
  search = (keyword) => {
    var searchObject = {};
    searchObject.text = keyword;
    searchObject.pageIndex = this.state.page;
    searchObject.pageSize = this.state.rowsPerPage;
    getByPage(searchObject).then(({ data }) => {
      this.setState({ itemList: [...data.content], totalElements: data.totalElements })
    });
  }

  handleChange(event) {
    this.setState({ keyword: event.target.value });
  }
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }
  handleChangeCode = (event) => {
    this.setState({ code: event.target.value });
  }

  handleFormSubmit = () => {
    let { id } = this.state;
    let { code } = this.state;
    let {t} = this.props
    checkCode(id, code).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        toast.warning(t('CommonObject.noti.dupli_code')); 
        // alert("Code đã được sử dụng");
      } else {
        saveItem({ ...this.state }).then(() => {
          this.props.handleClose();
        });
      }
    });
    
  }
  render() {

    const { t, i18n, handleClose, handleSelect, selectedItem, open } = this.props;
    let { keyword, name, code, type, typeId, commonObjectTypes,shouldOpenNotificationPopup} = this.state;
    let columns = [
      { title: t("CommonObject.name"), field: "name", width: "150" },
      { title: t("CommonObject.vode"), field: "code", align: "left", width: "150" },

      {
        title: t("general.action"),
        field: "custom",
        align: "left",
        width: "250",
        render: rowData => <Radio name="radSelected" value={rowData.id} checked={this.state.selectedValue === rowData.id} onClick={(event) => this.handleClick(event, rowData)}
        />
      },
    ];
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="sm" fullWidth>
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
        <DialogTitle style={{ cursor: 'move', paddingBottom:'0px' }} id="draggable-dialog-title">
          {t("general.saveUpdate")}
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
        <DialogContent>
            <Grid className="" container spacing={2}>
              <Grid item sm={7} xs={12}>
                <TextValidator
                  className="w-100"
                  label={<span><span style={{color:"red"}}>*</span>{t('CommonObjectType.name')}</span>}
                  onChange={this.handleChangeName}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={[t('general.required')]}
                />
              </Grid>
              <Grid item sm={5} xs={12}>
                <TextValidator
                  className="w-100 "
                  label={<span><span style={{color:"red"}}>*</span>{t('CommonObjectType.code')}</span>}
                  onChange={this.handleChangeCode}
                  type="text"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={[t('general.required')]}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <FormControl className="w-100">
                  <InputLabel htmlFor="type">{t("CommonObjectType.title")}</InputLabel>
                  <Select
                    value={typeId}
                    onChange={event => this.handleChangeCommonObjectType(event)}
                    inputProps={{
                      name: "type",
                      id: "type"
                    }}
                  >
                    {(commonObjectTypes && commonObjectTypes.length > 0 && commonObjectTypes.map(typeSelected => (
                      <MenuItem key={typeSelected.id} value={typeSelected.id}>
                        {typeSelected.name}
                      </MenuItem>
                    )))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
          <div className="flex flex-space-between flex-middle mt-12">
           <Button
              variant="contained"
              className="mr-12"
              color="secondary"
              onClick={() => this.props.handleClose()}
            >
              {t('general.cancel')}
            </Button>
            <Button
              style={{marginRight:'15px'}}
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
export default CommonObjectDialog;