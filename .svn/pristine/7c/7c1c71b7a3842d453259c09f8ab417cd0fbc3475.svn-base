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
import { searchByPage,getByRoot } from '../../AssetGroup/AssetGroupService'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Draggable from 'react-draggable'
import Paper from '@material-ui/core/Paper'
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';

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
class SelectAssetGroupPopup extends React.Component {
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

  // updatePageData = () => {
  //   var searchObject = {}
  //   searchObject.keyword = this.state.keyword
  //   searchObject.pageIndex = this.state.page + 1
  //   searchObject.pageSize = this.state.rowsPerPage
  //   searchByPage(searchObject)
  //     .then(({ data }) => {
  //       const itemList = data.content.filter(
  //         (data) => data.code !== this.props.editingItemCode
  //       )
  //       this.setState({
  //         itemList: itemList,
  //         totalElements: data.totalElements,
  //       })
  //     })
  //     .catch((err) => alert('ERROR'))
  // }
  updatePageData = () => {
    var searchObject = {}
    searchObject.keyword = this.state.keyword
    searchObject.pageIndex = this.state.page + 1
    searchObject.pageSize = this.state.rowsPerPage

    //searchByPage(searchObject).then(({ data }) => {
    getByRoot(this.state.page + 1,this.state.rowsPerPage).then(({ data }) => {
      var treeValues = [];

      let itemListClone = [...data.content];

      itemListClone.forEach(item=>{
        var items =this.getListItemChild(item);
        treeValues.push(...items);
      })

      let count = itemListClone.length
      let itemList =[]
      // this.clone(itemListClone,itemList,count);
      this.setState({
        itemList: treeValues,
        totalElements: data.totalElements,
      },function(){
        console.log(this.state.itemList);
      })
    })
  }

  componentDidMount() {
    this.updatePageData(this.state.page, this.state.rowsPerPage)
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
    let { open, handleClose, selectedItem } = this.props
    //this.setState(item);
    this.setState({ selectedValue: selectedItem.id })
  }

  handleKeyDownEnterSearch = (e) => {
    if (e.key === 'Enter') {
      this.search()
    }
  }

  search() {
    this.setPage(0, function () {
      var searchObject = {}
      searchObject.keyword = this.state.keyword
      searchObject.pageIndex = this.state.page
      searchObject.pageSize = this.state.rowsPerPage
      searchByPage(searchObject)
        .then(({ data }) => {
          this.setState({
            itemList: [...data.content],
            totalElements: data.totalElements,
          })
        })
        .catch((err) => alert('ERROR'))
    })
  }

  handleChange = (event, source) => {
    event.persist()
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  onClickRow = (selectedRow) => {
    document.querySelector(`#radio${selectedRow.id}`).click();
  }

  handleKeyUp= e=>{
    this.search();
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
        cellStyle: {
          padding:'0px'
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
        title: t('component.assetGroup.name'),
        field: 'name',
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
          <span className="mb-20">{t('component.assetGroup.title')}</span>
        </DialogTitle>
        <DialogContent style={{overflow:'hidden'}}>
          {/* <Grid item xs={12}>
            <Input
              label={t('general.enterSearch')}
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDownEnterSearch}
              onKeyUp={this.handleKeyUp}
              style={{width:'50%'}}
              className="mb-16 mr-12"
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
          </Grid> */}
          <Grid item xs={12}>
            <MaterialTable
              data={this.state.itemList}
              onRowClick={((evt, selectedRow) => this.onClickRow(selectedRow))}

              columns={columns}
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
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                }), 
                maxBodyHeight: '253px',
                minBodyHeight: '253px',
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
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
            className="mr-12 align-bottom"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}
          >
            {t('general.cancel')}
          </Button>
          <Button
            className="mr-16 align-bottom"
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
export default SelectAssetGroupPopup
