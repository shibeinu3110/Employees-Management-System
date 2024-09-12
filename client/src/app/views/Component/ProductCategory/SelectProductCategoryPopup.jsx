import { InputAdornment, Input, Grid, MuiThemeProvider,  TextField, Button, TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog, DialogActions } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
// import { searchByPage } from "../../Supplier/SupplierService";
import { searchByPage } from "../../ProductCategory/ProductCategoryService"
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';

// import SupplierDialog from '../../Supplier/SupplierDialog'
import ProductCategoryEditorDialog from '../../ProductCategory/ProductCategoryEditorDialog'
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class SelectProductCategoryPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    departmentId: '',
    userDepartmentId: '',
    managementDepartmentId: '',
    voucherType: null,
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectedItem: {},
    keyword: '',
    code: '',
    name: '',
    shouldOpenProductCategoryDialog: false,
    // isChecked: false
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
    // searchObject.voucherType = this.props.voucherType;
    // searchObject.userDepartmentId = this.props.userDepartmentId;
    // searchObject.managementDepartmentId = this.props.managementDepartmentId;
    // searchObject.departmentId = this.props.departmentId;
    // searchObject.name
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    // searchByText()
    // debugger;
    searchByPage(searchObject).then(({ data }) => {
      this.setState({ itemList: [...data.content], totalElements: data.totalElements })
    });
  }

  componentDidMount() {
    this.updatePageData(this.state.page, this.state.rowsPerPage);
  }

  handleClick = (event, item) => {
    //alert(item);
    if (item.id != null) {
      this.setState({ selectedValue: item.id, selectedItem: item });
    } else {
      this.setState({ selectedValue: null, selectedItem: null });
    }
  }

  componentWillMount() {
    let { open, handleClose, selectedItem, voucherType, userDepartmentId, managementDepartmentId, departmentId, name, code } = this.props;
    //this.setState(item);
    this.setState({ name: name, code: code, selectedValue: selectedItem.id, voucherType: voucherType, userDepartmentId: userDepartmentId, managementDepartmentId: managementDepartmentId, departmentId: departmentId });
  }

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search() {
    this.setPage(0, function () {
      var searchObject = {};
      // searchObject.voucherType = this.props.voucherType;
      // searchObject.userDepartmentId = this.props.userDepartmentId;
      // searchObject.managementDepartmentId = this.props.managementDepartmentId;
      // searchObject.departmentId = this.props.departmentId;
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    });
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    }, function () {
      this.search();
    });
  };

  handleOpenProductCategoryDialog = () => {
    this.setState({
      shouldOpenProductCategoryDialog: true
    })
  }

  handleDialogSupplyClose = () => {
    this.setState({
      shouldOpenSupplyDialog: false
    })
  }

  handleOKEditClose = () => {
    this.setState({
      shouldOpenProductCategoryDialog: false
    });
    this.updatePageData();
  };

  onClickRow = (selectedRow) => {
    document.querySelector(`#radio${selectedRow.id}`).click();
  }

  render() {
    const { t, i18n, handleClose, handleSelect, selectedItem, open } = this.props;
    let { keyword, shouldOpenSupplyDialog, itemList, shouldOpenProductCategoryDialog } = this.state;
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",
        cellStyle: {
          padding:'0px'
        },
        render: rowData => <Radio id={`radio${rowData.id}`} name="radSelected" value={rowData.id} checked={this.state.selectedValue === rowData.id} onClick={(event) => this.handleClick(event, rowData)}
        />
      },
      { title: t("ProductCategory.code"), field: "code", align: "left", width: "150" },
      { title: t("ProductCategory.name"), field: "name", align: "left", width: "150" },
    ];
    return (
      <Dialog onClose={handleClose} open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="mb-20">{t("ProductCategory.select_title")}</span>
        </DialogTitle>
        <DialogContent>
          <Grid item xs={12}>
            <Input
              label={t('general.enterSearch')}
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDownEnterSearch}
              style={{width:'50%'}}
              className="mb-16"
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
            <div>
              {shouldOpenProductCategoryDialog && (
                <ProductCategoryEditorDialog t={t} i18n={i18n}
                  handleClose={this.handleDialogProductCategoryClose}
                  open={shouldOpenProductCategoryDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={{}}
                />
              )}
            </div>
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
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 == 1) ? '#EEE' : '#FFF',
                }), 
                maxBodyHeight: '253px',
                minBodyHeight: '253px',
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
                padding: 'dense',
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
              page={this.state.page}
              labelRowsPerPage={t('general.rows_per_page')}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
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
            className="mr-12 align-bottom"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}>{t('general.cancel')}</Button>

          <Button className="align-bottom"
            style={{marginRight:'15px'}}
            variant="contained"
            color="primary"
            onClick={() => handleSelect(this.state.selectedItem)}>
            {t('general.select')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default SelectProductCategoryPopup;