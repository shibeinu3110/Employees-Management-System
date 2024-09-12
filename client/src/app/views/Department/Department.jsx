import {
  Grid,
  TextField,
  IconButton,
  Icon,
  Button,
  TableHead,
  TableCell,
  TableRow,
  Checkbox,
  TablePagination,
  FormControl,
  Input,InputAdornment,
} from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import React, { Component } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader,
} from 'material-table'
import { useTranslation, withTranslation, Trans } from 'react-i18next'
import {
  getByPage,
  deleteItem,
  saveItem,
  getItemById,
  searchByPage,
  searchByPageDeparment,
  searchParentByPage
} from './DepartmentService'
import DepartmentDialog from './DepartmentDialog'
import { Breadcrumb, ConfirmationDialog } from 'egret'
import { Helmet } from 'react-helmet'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";
import NotificationPopup from '../Component/NotificationPopup/NotificationPopup'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure({
  autoClose: 2000,
  draggable: false,
  limit:3
  //etc you get the idea
});
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    position: 'absolute',
    top: '-10px',
    left: '-25px',
    width: '80px',
  },
}))(Tooltip)

function MaterialButton(props) {
  const { t, i18n } = useTranslation()
  const item = props.item
  return (
    <div className="none_wrap">
      <LightTooltip
        title={t('general.editIcon')}
        placement="right-end"
        enterDelay={300}
        leaveDelay={200}
      >
        <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
          <Icon fontSize="small" color="primary">edit</Icon>
        </IconButton>
      </LightTooltip>
      <LightTooltip
        title={t('general.deleteIcon')}
        placement="right-end"
        enterDelay={300}
        leaveDelay={200}
      >
        <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
          <Icon fontSize="small" color="error">delete</Icon>
        </IconButton>
      </LightTooltip>
    </div>
  )
}
class Department extends React.Component {
  state = {
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    shouldOpenConfirmationDeleteAllDialog: false,
    shouldOpenConfirmationDeleteListDialog: false,
    shouldOpenNotificationPopup:false,
    keyword: '',
    Notification:"",
  }
  constructor(props) {
    super(props)
    //this.state = {keyword: ''};
    this.handleTextChange = this.handleTextChange.bind(this)
  }
  handleTextChange(event) {
    this.setState({ keyword: event.target.value })
  }

  search(searchValue) {
    var searchObject = {}
    this.setState({ page: 0 })
    searchObject.keyword = this.state.keyword
    searchObject.pageIndex = this.state.page
    searchObject.pageSize = this.state.rowsPerPage
    searchParentByPage(searchObject).then(({ data }) => {
      var treeValues = [];

      let itemListClone = [...data.content];

      itemListClone.forEach(item=>{
        var items =this.getListItemChild(item);
        treeValues.push(...items);
      })
      this.setState({
        itemList: treeValues,
        totalElements: data.totalElements,
      })
    })
  }

  checkData = () => {
    let {t} = this.props
    if (!this.data || this.data.length === 0) {
      toast.warning(t('general.noti_check_data'));
      // alert('Chưa chọn dữ liệu')
    } else if (this.data.length === this.state.itemList.length) {
      // alert("Bạn có muốn xoá toàn bộ");

      this.setState({ shouldOpenConfirmationDeleteAllDialog: true })
    } else {
      this.setState({ shouldOpenConfirmationDeleteListDialog: true })
    }
  }

  handleKeyDownEnterSearch = (e) => {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  componentDidMount() {
    this.updatePageData()
  }
  updatePageData = () => {
    var searchObject = {}
    searchObject.keyword = ''
    searchObject.pageIndex = this.state.page
    searchObject.pageSize = this.state.rowsPerPage
    searchParentByPage(searchObject).then(({ data }) => {
      var treeValues = [];

      let itemListClone = [...data.content];

      itemListClone.forEach(item=>{
        var items =this.getListItemChild(item);
        treeValues.push(...items);
      })
      this.setState({
        itemList: treeValues,
        totalElements: data.totalElements,
      })
    })
  }
  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData()
    })
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData()
    })
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
    })
    this.setPage(0)
  }

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenConfirmationDeleteListDialog: false,
      shouldOpenNotificationPopup:false,
    })
    this.updatePageData()
  }

  handleOKEditClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      shouldOpenConfirmationDeleteListDialog: false,
    })
    this.setPage(0)
  }

  handleDelete = (id) => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true,
    })
  }

  handleConfirmationResponse = () => {
    let {t} = this.props
    deleteItem(this.state.id)
      .then((res) => {
        this.handleDialogClose()
        this.updatePageData()
      })
      .catch((err) => {
        toast.warning(t('Department.noti.use'));
        // alert('Phòng ban đang sử dụng, không thể xóa')
        // this.handleDialogClose()
      })
  }

  handleEditItem = (item) => {
    this.setState({
      item: item,
      shouldOpenEditorDialog: true,
    })
  }

  async handleDeleteList(list) {
    let listAlert =[];
    let {t} = this.props
    for (var i = 0; i < list.length; i++) {
      // deleteItem(list[i].id)
      try {
        await deleteItem(list[i].id);
      } catch (error) {
        listAlert.push(list[i].name);
      }    
    }
    this.handleDialogClose()
    if(listAlert.length === list.length) {
      toast.warning(t('Department.noti.use_all'));
      
      // alert("Các phòng đều đã sử dụng");
    } else if(listAlert.length >0) {
      toast.warning(t('Department.noti.deleted_unused'));
      // alert("Đã xoá các phòng chưa sử dụng");
    }
    // return(listAlert);
  }
  handleDeleteAll = (event) => {
    // this.data = null
    if (this.data != null) {
      this.handleDeleteList(this.data).then(() => {
        // this.handleDialogClose()
      })
    } else {
      // this.handleDialogClose()
    //alert(this.data.length);
    this.handleDeleteList(this.data).then(() => {
      this.updatePageData();
      // this.handleDialogClose();
      this.data = null;
    }

    )};
  }
  getListItemChild(item){
    var result = [];
    var root ={};
    root.name =item.name; 
    root.code = item.code;
    root.id=item.id;
    root.parentId=item.parentId;
    result.push(root);
    if(item.children){
      item.children.forEach(child=>{
        var childs = this.getListItemChild(child);
        result.push(...childs);
      });
    }
    return result;
  }

  render() {
    const { t, i18n } = this.props
    let { keyword ,shouldOpenNotificationPopup} = this.state
    let TitlePage = t('Department.title')

    let columns = [
      {
        title: t('general.action'),
        field: 'custom',
        align: 'left',
        width: '120px',
        cellStyle:{
          paddingLeft: '0px'
        },
        headerStyle:{
          paddingLeft: '0px'
        },
        render: (rowData) => (
          <MaterialButton
            item={rowData}
            onSelect={(rowData, method) => {
              if (method === 0) {
                getItemById(rowData.id).then(({ data }) => {
                  if (data.parent === null) {
                    data.parent = {}
                  }
                  this.setState({
                    item: data,
                    shouldOpenEditorDialog: true,
                  })
                })
              } else if (method === 1) {
                this.handleDelete(rowData.id)
              } else {
                alert('Call Selected Here:' + rowData.id)
              }
            }}
          />
        ),
      },
      { title: t('Department.name'), field: 'name', width: '150' },
      {
        title: t('Department.code'),
        field: 'code',
        align: 'left',
        width: '150',
      },
    ]
    return (
      <div className="m-sm-30">
        <Helmet>
          <title>{TitlePage} | {t('web_site')}</title>
        </Helmet>
        <div className="mb-sm-30">
          {/* <Breadcrumb routeSegments={[{ name: t('Department.title') }]} /> */}
          <Breadcrumb
            routeSegments={[
              { name: t('Dashboard.category'), path: '/list/department' },
              { name: TitlePage },
            ]}
          />
        </div>
        <Grid container spacing={2} justify="space-between">
        <Grid item md={3} xs={12} >
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => {
                this.handleEditItem({
                  startDate: new Date(),
                  endDate: new Date(),
                })
              }}
            >
              {t('general.add')}
            </Button>
            <Button
              className="mb-16 mr-36 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.checkData()}
            >
              {t('general.delete')}
            </Button>

            {this.state.shouldOpenConfirmationDeleteAllDialog && (
              <ConfirmationDialog
                open={this.state.shouldOpenConfirmationDeleteAllDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t('general.deleteAllConfirm')}
                agree={t('general.agree')}
                cancel={t('general.cancel')}
              />
            )}

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

            {this.state.shouldOpenConfirmationDeleteListDialog && (
              <ConfirmationDialog
                title={t('general.confirm')}
                open={this.state.shouldOpenConfirmationDeleteListDialog}
                onConfirmDialogClose={this.handleDialogClose}
                onYesClick={this.handleDeleteAll}
                text={t('general.deleteConfirm')}
                agree={t('general.agree')}
                cancel={t('general.cancel')}
              />
            )}

            {/* <TextField
              label={t('Department.filter')}
              className="mb-16 mr-10"
              style={{ width: '30%' }}
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleTextChange}
              onKeyDown={this.handleKeyDownEnterSearch}
            />
            <Button
              className="mb-16 mr-16 align-bottom"
              variant="contained"
              color="primary"
              onClick={() => this.search(keyword)}
            >
              {t('general.search')}
            </Button> */}
            </Grid>
            {/* <Grid item md={6} sm={12} xs={12} >
            <FormControl fullWidth>
                <Input
                    className='search_box w-100'
                    onChange={this.handleTextChange}
                    onKeyDown={this.handleKeyDownEnterSearch}
                    placeholder={t("Department.filter")}
                    id="search_box"
                    startAdornment={
                        <InputAdornment >
                             <Link> <SearchIcon 
                            onClick={() => this.search(keyword)}
                            style ={{position:"absolute",
                            top:"0",
                            right:"0"
                          }} /></Link>
                        </InputAdornment>
                    }
                />
            </FormControl>
          </Grid> */}
          <Grid item xs={12}>
            <div>
              {this.state.shouldOpenEditorDialog && (
                <DepartmentDialog
                  t={t}
                  i18n={i18n}
                  handleClose={this.handleDialogClose}
                  open={this.state.shouldOpenEditorDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={this.state.item}
                />
              )}

              {this.state.shouldOpenConfirmationDialog && (
                <ConfirmationDialog
                  title={t('general.confirm')}
                  open={this.state.shouldOpenConfirmationDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleConfirmationResponse}
                  text={t('general.deleteConfirm')}
                  agree={t('general.agree')}
                  cancel={t('general.cancel')}
                />
              )}
            </div>
            <MaterialTable
              title={t('general.list')}
              data={this.state.itemList}
              labelRowsPerPage={t('general.rows_per_page')}
              
              columns={columns}
              parentChildData={(row, rows) => {
                var list = rows.find((a) => a.id === row.parentId)
                return list
              }}
              localization={{
                body: {
                  emptyDataSourceMessage: `${t('general.emptyDataMessageTable')}`
                },
                toolbar: {
                  // nRowsSelected: '${t('general.selects')}',
                  nRowsSelected: `${t('general.selects')}`
                }
              }}
              options={{
                selection: true,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF',
                }), 
                maxBodyHeight: '450px',
                minBodyHeight: '380px',
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
                padding: 'dense',
                toolbar: false
              }}
              components={{
                Toolbar: (props) => <MTableToolbar {...props} />,
              }}
              // labelRowsPerPage={t('general.rows_per_page')}
              onSelectionChange={(rows) => {
                this.data = rows
              }}
            />
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
              labelRowsPerPage={t('general.rows_per_page')}
              component="div"
              count={this.state.totalElements}
              rowsPerPage={this.state.rowsPerPage}
              labelDisplayedRows={ ({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
              page={this.state.page}
              backIconButtonProps={{
                'aria-label': 'Previous Page',
              }}
              nextIconButtonProps={{
                'aria-label': 'Next Page',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </Grid>
        </Grid>
      </div>
    )
  }
}
export default Department
