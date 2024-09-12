import {
  Grid,
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
  DialogActions,
  InputAdornment, Input
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
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
import { searchByPage,searchParentByPage } from '../../Department/DepartmentService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'
import { functions } from 'lodash'
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
class SelectDepartmentPopup extends React.Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
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
    keyword: '',
    checkPermissionUserDepartment:true
  }

  setPage = (page) => {
    this.setState({ page }, function () {
      this.updatePageData();
    })
  }

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    })
  }

  handleChangePage = (event, newPage) => {
    this.setPage(newPage)
  }

  updatePageData = () => {
    var searchObject = {};
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.checkPermissionUserDepartment = this.state.checkPermissionUserDepartment;
    searchByPage(searchObject).then(({ data }) => {

      this.setState({
        itemList: [...data.content],
        // itemList: testData,
        totalElements: data.totalElements,
      })
    })
  }

  componentDidMount() {
  }

  handleClick = (event, item) => {
    //alert(item);
    if (item.id != null) {
      this.setState({ selectedValue: item.id, selectedItem: item })
    } else {
      this.setState({ selectedValue: null, selectedItem: null })
    }
  }

  componentWillMount() {
    let { open, handleClose, selectedItem, checkPermissionUserDepartment } = this.props;
    this.setState({ selectedValue: selectedItem.id, checkPermissionUserDepartment }, function () {
      this.updatePageData();
    })
  }

  handleKeyDownEnterSearch = (e) => {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search() {
    this.setPage(0, function () {
      var searchObject = {};
      searchObject.departmentId = this.props?.receiverDepartmentId;
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.checkPermissionUserDepartment = this.state.checkPermissionUserDepartment;
      searchByPage(searchObject).then(({ data }) => {
        
        this.setState({
          itemList: [...data.content],
          totalElements: data.totalElements,
        })
      })
    })
  }

  onClickRow = (selectedRow) => {
    document.querySelector(`#radio${selectedRow.id}`).click();
  }

  handleChange = (event, source) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value,
    }, function(){
      this.search();
    })
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
    const {
      t,
      i18n,
      handleClose,
      handleSelect,
      selectedItem,
      open,
    } = this.props
    let { keyword } = this.state
    let columns = [
      {
        title: t('general.select'),
        field: 'custom',
        align: 'left',
        width: '250',        
        cellStyle:{
          padding:'0px',
          paddingLeft:'10px',  
        },
        render: (rowData) => (
          <Radio
            id={`radio${rowData.id}`}
            name="radSelected"
            value={rowData.id}
            checked={this.state.selectedValue === rowData.id}
            onClick={(event) => this.handleClick(event, rowData)}
          />
        ),
      },
      {
        title: t('component.department.text'),
        field: 'text',
        align: 'left',
        width: '150',
      },
    ]
    return (
      <Dialog
        onClose={handleClose}
        open={open}
        PaperComponent={PaperComponent}
        maxWidth={'md'}
        fullWidth
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="mb-20">{t('component.department.title')}</span>
        </DialogTitle>
        <DialogContent style={{height:'370px'}}>
          
        <Grid item md={6} sm={12} xs={12}>
            <Input
              label={t('general.enterSearch')}
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDownEnterSearch}
              className="w-100 mb-16"
              id="search_box"
              placeholder={t('general.enterSearch')}
              startAdornment={
                <InputAdornment >
                  <Link to="#"> <SearchIcon
                    onClick={() => this.search(keyword)}
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0"
                    }} /></Link>
                </InputAdornment>
              }
            />
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              data={this.state.itemList}
              columns={columns}
              onRowClick={((evt, selectedRow) => this.onClickRow(selectedRow))}

              parentChildData={(row, rows) => {
                var list = rows.find((a) => a.id === row.parentId)
                return list
              }}
              options={{
                toolbar: false,
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                padding: 'dense'
              }}
              components={{
                Toolbar: (props) => (
                  <div style={{ witdth: '100%' }}>
                    <MTableToolbar {...props} />
                  </div>
                ),
              }}
              onSelectionChange={(rows) => {
                this.data = rows
              }}
            />
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
              component="div"
              labelRowsPerPage={t('general.rows_per_page')}
              labelDisplayedRows={ ({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
              count={this.state.totalElements}
              rowsPerPage={this.state.rowsPerPage}
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
        </DialogContent>
        <DialogActions>
          <Button
            className="mb-16 mr-12 align-bottom"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}
          >
            {t('general.cancel')}
          </Button>
          <Button
            className="mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => handleSelect(this.state.selectedItem)}
          >
            {t('general.select')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default SelectDepartmentPopup
