import { Grid, InputAdornment, Input, MuiThemeProvider, TextField, Button, TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog, DialogActions, FormControlLabel } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { searchByPage, searchProductInVoucherByPage } from "../../Product/ProductService";
import ConstantList from "../../../appConfig";

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class SelectProductAllPopop extends React.Component {
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
    products: [],
    voucherType: null,
    voucherId: null,
    productTypeCode:"",
    storeId:"",
    isGetAll: false,
    planingDepartment: null
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

  componentDidMount() {
    this.updatePageData(this.state.page, this.state.rowsPerPage);
  }

  handleClick = (event, item) => {
    item.isCheck = event.target.checked;
    console.log(item.isCheck )
    let { products } = this.state;
    if (products == null) {
      products = [];
    }
    if (products != null && products.length == 0 && item.isCheck == true) {
      let p = {};
      p.Product = item;

      products.push(p);
    }
    else {
      let itemInList = false;
      products.forEach((el) => {
        if (el.Product.id == item.id) {
          itemInList = true;
        }
      });
      if (!itemInList && item.isCheck == true) {
        let p = {};
        p.Product = item;

        products.push(p);
      }
      else {

        products.forEach(item =>{
          if(item.Product.isCheck == false){
            let index = products.indexOf(item);
            products.splice(index,1);
          }
        })
      }
    }
    this.setState({ products: products }, function () {
    });
    // else {
    //   this.setState({ selectedValue: null, selectedItem: null });
    // }
  }

  componentWillMount() {
    let { open, handleClose, selectedItem, products, productTypeCode, voucherType, voucherId, storeId, planingDepartment } = this.props;
    //this.setState(item);
    this.setState({ products,productTypeCode, voucherType, voucherId, storeId, planingDepartment });
  }

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  search() {
    this.setPage(0, function () {
      let {planingDepartment} = this.props;
      var searchObject = {};
      searchObject.storeId = this.state.storeId;
      searchObject.productTypeCode = this.state.productTypeCode;
      searchObject.voucherType = this.state.voucherType;
      searchObject.voucherId = this.state.voucherId;
      searchObject.keyword = this.state.keyword.trim();
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;    
      searchObject.managementPurchaseDepartment = null;
      if(Object.keys(planingDepartment).length > 0){
        searchObject.managementPurchaseDepartment = planingDepartment;
      } 
      if (searchObject.voucherType) {
        searchProductInVoucherByPage(searchObject).then(({ data }) => {
          this.setState({ itemList: [...data.content], totalElements: data.totalElements })
        });
      }
      else {
        searchByPage(searchObject).then(({ data }) => {
          this.setState({ itemList: [...data.content], totalElements: data.totalElements })
        });
      }
    });
  };

  updatePageData = () => {
    var searchObject = {};
    let {planingDepartment} = this.props;
    let planingDepartmentClone = {};
    if(planingDepartment) {
      if(Object.keys(planingDepartment).length > 0){
        planingDepartmentClone = {...planingDepartment};
      }
    }
    searchObject.storeId = this.state.storeId;
    searchObject.productTypeCode = this.state.productTypeCode;
    searchObject.voucherType = this.state.voucherType;
    searchObject.voucherId = this.state.voucherId;
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.managementPurchaseDepartment = null;
    if(Object.keys(planingDepartmentClone).length > 0 && this.state.isGetAll === false){
      searchObject.managementPurchaseDepartment = planingDepartmentClone;
    } 
    
    if (searchObject.voucherType) {
      searchProductInVoucherByPage(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    }
    else {
      searchByPage(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    }
  }

  handleChange = (event, source) => {
    // console.log(source, event.target.checked)
    event.persist();
    if (source === 'isGetAll') {
      this.setState({ isGetAll: event.target.checked },
        () => this.updatePageData())
      
      return
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleOpenProductDialog = () => {
    this.setState({
      shouldOpenProductDialog: true
    })
  }

  handleDialogProductClose = () => {
    this.setState({
      shouldOpenProductDialog: false
    })
  }

  handleOKEditClose = () => {
    this.setState({
      shouldOpenProductDialog: false
    });
    this.updatePageData();
  };

  onClickRow = (selectedRow) => {
    document.querySelector(`#radio${selectedRow.id}`).click();
  }

  handleKeyUp = e => {
    this.search()
  }

  render() {
    const { t, i18n, handleClose, handleSelect, selectedItem, open, planingDepartment } = this.props;
    let planingDepartmentClone = {};
    if(planingDepartment) {
      if(Object.keys(planingDepartment).length > 0){
        planingDepartmentClone = {...planingDepartment};
      }
    }
    let { keyword, shouldOpenProductDialog, itemList, products, voucherType, voucherId, storeId,
      totalElements, rowsPerPage, page, isGetAll } = this.state;
    let columns = [
      { title: t("Product.code"), field: "code", align: "left", width: "150px" },
      { title: t("Product.name"), field: "name", align: "left", width: "150" },
    ];
    let columnsInSearchByVoucher = [
      { title: t("Product.code"), field: "code", align: "left", width: "150px" },
      { title: t("Product.name"), field: "name", align: "left", width: "150" },
      { title: t("StockKeepingUnit.title"), field: "sku.name", align: "left", width: "150px" },
      {
        title: t("InventoryDeliveryVoucher.quantity_volume"), field: "", align: "left", width: "200px",
        render: rowData => <span>
          {(rowData.skuType === 1 || rowData.skuType === 0) ? rowData.remainingQuantity : rowData.remainingVolume}

        </span>
      },
      {
        title: t("Product.price"), field: "price", align: "center", width: "200px",
        cellStyle:{
          textAlign:"right"
        },
        render: (rowData) => {
          let number = new Number(rowData.price);
          if (number != null) {
            let plainNumber = number.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            return plainNumber;
          }
        }
      }
    ];
    return (
      <Dialog onClose={handleClose} open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="mb-20">{t("Product.title")}</span>
        </DialogTitle>
        <DialogContent style={{overflow:'hidden'}}>
        <Grid container spacing={2}>
          <Grid item md={6} sm={6} xs={12}>
            <Input
              label={t('general.enterSearch')}
              type="text"
              name="keyword"
              value={keyword}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDownEnterSearch}
              onKeyUp={this.handleKeyUp}
              fullWidth
              className="mb-16 "
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
            <Grid item md={6} sm={6} xs={12}>
              {Object.keys(planingDepartmentClone).length > 0 ?
                <FormControlLabel
                  style={{float:'right'}}
                  value={isGetAll}
                  className="mb-16"
                  name="isGetAll"
                  onChange={(isGetAll) => this.handleChange(isGetAll, 'isGetAll')}
                  control={<Checkbox checked={isGetAll} />}
                  label={t('general.allProduct')}
                /> : ''}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <MaterialTable
              data={itemList}
              columns={voucherType ? columnsInSearchByVoucher : columns}
              options={{
                toolbar: false,
                selection: true,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                padding:'dense',
                minBodyHeight:'208px',
                maxBodyHeight:'208px'
              }}
              components={{
                Toolbar: props => (
                  <div style={{ witdth: "100%" }}>
                    <MTableToolbar {...props} />
                  </div>
                ),
              }}
              onSelectionChange={(rows) => this.setState({
                products: rows.map(row => ({
                  ...row,
                  tableData: {
                    ...row.tableData,
                    checked: false
                  }
                }))
              })}
            />
            <TablePagination
              align="left"
              className="px-16"
              rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
              onRowClick={((evt, selectedRow) => this.onClickRow(selectedRow))} 
              component="div"
              count={totalElements}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={t('general.rows_per_page')}
              labelDisplayedRows={ ({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
              page={page}
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
            variant="contained"
            color="primary"
            onClick={() => handleSelect(products)}>
            {t('general.select')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default SelectProductAllPopop;