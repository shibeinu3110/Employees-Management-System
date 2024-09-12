import { Grid, MuiThemeProvider, TextField,InputAdornment, Input, Button, TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog, DialogActions } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { searchByPage } from "../../Product/ProductService";
import { personSearchByPage } from "../../AssetAllocation/AssetAllocationService";
import { findUserByUserName } from "../../User/UserService";
import AsynchronousAutocomplete from '../../utilities/AsynchronousAutocomplete'
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { searchByPageDeparment as searchDepartment } from '../../Department/DepartmentService'
import ProductDialog from '../../Product/ProductDialog';
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class SelectUserDepartment extends React.Component {
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
    keyword: '',
    shouldOpenProductDialog: false,
    receiverDepartmentId: '',
    department:[],
  };

  setPage = page => {
    this.setState({ page }, function () {
      this.updatePageData();
    })
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
      this.updatePageData();
    })
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  updatePageData = () => {
    var searchObject = {};
    searchObject.departmentId = this.props.receiverDepartmentId;
    searchObject.keyword = this.props.receiverDepartmentId?this.props.receiverDepartmentId: this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    findUserByUserName(searchObject).then(({ data }) => {
      this.setState({ itemList: [...data.content], totalElements: data.totalElements })
    });
  }

  componentDidMount() {
    this.updatePageData(this.state.page, this.state.rowsPerPage);
  }

  handleClick = (event, item) => {
    // debugger
    // console.log(item.user);
    if (item.user.person.id != null) {
      this.setState({ selectedValue: item.user.person.id, selectedItem: item });
    } else {
      this.setState({ selectedValue: null, selectedItem: null });
    }
  }

  componentWillMount() {
    let { open, handleClose, selectedItem, searchObject } = this.props;
    //this.setState(item);
    this.setState({ selectedValue: selectedItem.id });
  }

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search() {
    this.setPage(0, function () {
      var searchObject = {};
    //   searchObject.departmentId = this.state.department.id;
      searchObject.keyword = this.props.receiverDepartmentId ? this.props.receiverDepartmentId: this.state.keyword;;
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;
    //   searchObject.checkPermissionUserDepartment = this.state.department.text;
      findUserByUserName(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    });
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    },function(){
      this.search();
    });
  };

  onClickRow = (selectedRow) => {
    // console.log(selectedRow.user.id)
    document.querySelector(`#radio${selectedRow.user.id}`).click();
  }

  selectDepartment = (item) =>{

    this.setState({ department: item ? item: null }, function () {
        // console.log(this.state.department.name)
            var searchObject = {};
            searchObject.keyword = this.state.department ? this.state.department.name : null;
            searchObject.pageIndex = this.state.page;
            searchObject.pageSize = this.state.rowsPerPage;
            findUserByUserName(searchObject).then(({ data }) => {
              this.setState({ itemList: [...data.content], totalElements: data.totalElements })
            });
      })
  }

  render() {
    const { t, i18n, handleClose, handleSelect, selectedItem, open, searchObject } = this.props;
    let { keyword, shouldOpenProductDialog, itemList, department } = this.state;
    let SearchDepartment = { pageIndex: 0, pageSize: 1000000 }
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",
        cellStyle: {
          padding:'0px'
        },
        render: rowData => <Radio id={`radio${rowData.user.id}`} name="radSelected" value={rowData.user.person.id} checked={this.state.selectedValue === rowData.user.person.id} onClick={(event) => this.handleClick(event, rowData)}
        />
      },
      // { title: t("general.code"), field: "userId", align: "left", width: "150" },
      { title: t("general.name"), field: "user.displayName", width: "150" },
      { title: t("component.department.text"), field: "department.name", width: "150" },
    ];
    return (
      <Dialog onClose={handleClose} open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth>
        <DialogTitle style={{ cursor: 'move', paddingBottom:'0px' }} id="draggable-dialog-title">
          <span className="">{t("Asset.receiverPerson")}</span>
        </DialogTitle>
        <DialogContent>
          <Grid item container spacing={2} xs={12}>
           <Grid item md={6} sm={12} xs={12}>
              <Input
                label={t('general.enterSearch')}
                style={{marginTop:'16px'}}
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
            <Grid item md={3} xs={12}></Grid>
            <Grid item md={3} xs={12}>
              <AsynchronousAutocomplete
                label={t('general.filterDerpartment')}
                searchFunction={searchDepartment}
                searchObject={SearchDepartment}
                defaultValue={department}
                displayLable={'name'}
                value={department}
                onSelect={this.selectDepartment}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              data={this.state.itemList}
              columns={columns}

              onRowClick={((evt, selectedRow) => this.onClickRow(selectedRow))}

              parentChildData={(row, rows) => {
                var list = rows.find(a => a.id === row.parentId);
                return list;
              }}
              options={{
                toolbar: false,
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                maxBodyHeight: '253px',
                minBodyHeight: '253px',
                padding: 'dense',
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF'
                }), 
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
              }}
              components={{
                Toolbar: props => (
                  <div style={{ witdth: "100%" }}>
                    <MTableToolbar {...props} />
                  </div>
                ),
              }}
              onSelectionChange={(rows) => {
                this.data = rows;
              }}
            />
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
              component="div"
              count={this.state.totalElements}
              rowsPerPage={this.state.rowsPerPage}
              labelRowsPerPage={t('general.rows_per_page')}
              labelDisplayedRows={ ({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
              page={this.state.page}
              backIconButtonProps={{
                "aria-label": "Previous Page"
              }}
              nextIconButtonProps={{
                "aria-label": "Next Page"
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.setRowsPerPage}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className="mr-12"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}>{t('general.cancel')}</Button>
          <Button className="mr-16"
            variant="contained"
            style={{marginLeft:'0px'}}
            color="primary"
            onClick={() => handleSelect(this.state.selectedItem)}>
            {t('general.select')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default SelectUserDepartment;