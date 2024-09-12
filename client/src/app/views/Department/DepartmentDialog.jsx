import {
  Grid,
  DialogActions,
  MuiThemeProvider,
  TextField,
  Button,
  TableHead,
  TableCell,
  TableRow,
  Checkbox,
  TablePagination,
  Radio,
  Dialog,
  FormControlLabel
} from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from 'material-table'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import DateFnsUtils from '@date-io/date-fns'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import AsynchronousAutocomplete from '../utilities/AsynchronousAutocomplete'
import SelectDepartmentPopup from '../Component/Department/SelectDepartmentPopup'
import Draggable from 'react-draggable'
import {checkCode,searchByPageDeparment} from './DepartmentService'
import NotificationPopup from '../Component/NotificationPopup/NotificationPopup'
import {
  getByPage,
  deleteItem,
  saveItem,
  getItemById,
  getAll,checkParent
} from './DepartmentService'
import Paper from '@material-ui/core/Paper'
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
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
class DepartmentDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  state = {
    id: '',
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenDepartmentPopup: false,
    shouldOpenNotificationPopup:false,
    selectedItem: {},
    parent: '',
    type: 0,
    keyword: '',
    Notification:"",
    isAssetManagement:false,
    viewIndex:0,
  }

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData()
    })
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 })
    this.updatePageData()
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  updatePageData = () => {
    var searchObject = {}
    searchObject.keyword = ''
    searchObject.pageIndex = this.state.page + 1
    searchObject.pageSize = this.state.rowsPerPage
    getByPage(this.state.page, this.state.rowsPerPage).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
      })
    })
  }

  componentDidMount() {
    this.updatePageData()
  }
  handleFormSubmit = () => {
    let {t} = this.props
    let { id, name, code, parent,isAssetManagement,viewIndex } = this.state;
    checkCode(id, code).then( data => {
      if(data.data) {
        toast.warning(t('Department.noti.dupli_code'));
        // alert("Mã phòng ban đã được sử dụng");
      } else {
        if(parent === ""){
          parent = null;
        }

        checkParent({id, name, code, parent,isAssetManagement,viewIndex}).then((isCheck) =>{
          if(isCheck.data){
            toast.error(t('Department.noti.updateFailParent'));
          }else{
            saveItem({id, name, code, parent,isAssetManagement,viewIndex}).then(() => {
              this.props.handleClose()
            })
          }
        })

        
      }
    })
    
  }

  handleClick = (event, item) => {
    //alert(item);
    if (item.id != null) {
      this.setState({ selectedValue: item.id, selectedItem: item })
    } else {
      this.setState({ selectedValue: item.id, selectedItem: null })
    }
  }
  componentWillMount() {
    const {handleDialogClose} = this.props
    this.setState(
      {
        ...this.props.item,
      },
      function () {
        let { parent } = this.state
        if (parent != null && parent.id != null) {
          this.setState({ parentId: parent.id })
        }
      }
    )
  }
  search = (keyword) => {
    var searchObject = {}
    searchObject.text = keyword
    searchObject.pageIndex = this.state.page
    searchObject.pageSize = this.state.rowsPerPage
    searchByPageDeparment(searchObject).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements,
      })
    })
  }

  handleChange(event, source) {
    // debugger
    if (source === 'isAssetManagement') {
      this.setState({ isAssetManagement: event.target.checked })
      return
    }
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleDepartmentPopupClose = () => {
    this.setState({
      shouldOpenDepartmentPopup: false,
    })
  }
  handleSelectDepartment = (item) => {
    this.setState({ parent: { id: item.id, name: item.text } }, function () {
      this.handleDepartmentPopupClose();
    })
  }
  handleDialogClose =()=>{
    this.setState({shouldOpenNotificationPopup:false,})
  }
  render() {
    let searchObject = { pageIndex: 0, pageSize: 1000000 }
    const {
      t,
      i18n,
      handleClose,
      handleSelect,
      selectedItem,
      open,
      handleDialogClose
    } = this.props
    let {
      keyword,
      parent,
      name,
      code,
      type,
      isAssetManagement,
      shouldOpenDepartmentPopup,
      shouldOpenNotificationPopup,
      viewIndex
    } = this.state
    let columns = [
      { title: t('Department.name'), field: 'name', width: '150' },
      {
        title: t('Department.code'),
        field: 'code',
        align: 'left',
        width: '150',
      },
      {
        title: t('Department.type'),
        field: 'type',
        align: 'left',
        width: '150',
      },
      {
        title: t('general.action'),
        field: 'custom',
        align: 'left',
        width: '250',
        render: (rowData) => (
          <Radio
            name="radSelected"
            value={rowData.id}
            checked={this.state.selectedValue === rowData.id}
            onClick={(event) => this.handleClick(event, rowData)}
          />
        ),
      },
    ]
    return (
      <Dialog open={open} PaperComponent={PaperComponent}>
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
          <h4 className="">{t('Department.saveUpdate')}</h4>
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
          <DialogContent>
            <Grid className="" container spacing={2}>              
              <Grid item sm={12} xs={12}>
                <Button
                  style={{float:'right'}}
                  className=" mt-12"
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() =>
                    this.setState({ shouldOpenDepartmentPopup: true, item: {} })
                  }
                >
                  {t('general.select')}
                </Button>
                <TextValidator
                  InputProps={{
                    readOnly: true,
                  }}
                  label={t('Department.parent')}
                  className="w-80"
                  value={parent.name || ''}
                />                
                {shouldOpenDepartmentPopup && (
                  <SelectDepartmentPopup
                    open={shouldOpenDepartmentPopup}
                    handleSelect={this.handleSelectDepartment}
                    selectedItem={parent != null ? parent : {}}
                    handleClose={this.handleDepartmentPopupClose}
                    t={t}
                    i18n={i18n}
                  />
                )}
              </Grid>

              <Grid item sm={7} xs={12}>
                <TextValidator
                  className="w-100"
                  label={<span><span style={{color:"red"}}>*</span>{t('Department.name')}</span>}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={['required']}
                  errorMessages={[t('general.required')]}
                />
              </Grid>
              <Grid item sm={5} xs={12}>
                <TextValidator
                  className="w-100"                  
                  label={<span><span style={{color:"red"}}>*</span>{t('Department.code')}</span>}
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={['required']}
                  errorMessages={[t('general.required')]}
                />
              </Grid>
              <Grid item sm={7} xs={12}>
                <FormControlLabel
                  value={isAssetManagement}
                  className=""
                  style={{marginTop:'15px'}}
                  name="isAssetManagement"
                  onChange={(isAssetManagement) => this.handleChange(isAssetManagement, 'isAssetManagement')}
                  control={<Checkbox checked={isAssetManagement} />}
                  label={t('Department.isAssetManagement')}
                />
              </Grid>
              <Grid item md ={5} sm={6} xs={12}>
                <TextValidator
                  className="w-100"
                  label={
                    <span>
                      <span style={{ color: 'red' }}> *</span>
                      {t('AssetGroup.viewIndex')}                      
                    </span>
                  }
                  onChange={this.handleChange}
                  type="text"
                  name="viewIndex"
                  value={viewIndex}
                  validators={['required']}
                  errorMessages={[t('general.required')]}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <div className="flex flex-space-between flex-middle">
            <Button
                variant="contained"
                className="mr-12"
                color="secondary"
                onClick={() => this.props.handleClose()}
              >
                {t('general.cancel')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{marginRight:'15px'}}
              >
                {t('general.save')}
              </Button>
              
            </div>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    )
  }
}
export default DepartmentDialog
