import { Grid, MuiThemeProvider, TextField, InputAdornment, Input, Button, TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog, DialogActions } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { searchByPage } from "../../Asset/AssetService";
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class SelectAssetAllPopop extends React.Component {
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
        assetList:[]
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

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  updatePageData = () => {
    let status = 0;
    var searchObject = {};      
      searchObject.voucherType = this.props.voucherType;
      searchObject.userDepartmentId = this.props.departmentId;
      searchObject.managementDepartmentId = this.props.handoverDepartment ? this.props.handoverDepartment.id:"";

      if(this.props.isAssetTransfer) {
        searchObject.statusIndexOrders = this.props.statusIndexOrders;
      } else if (this.props.isAssetAllocation){
        searchObject.statusIndexOrders = this.props.statusIndexOrders;
      } else {
        searchObject.indexOrder = status;
      }
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page +1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(({ data }) => {
        let itemListClone = [...data.content]
      itemListClone.map( item => {
        if(this.state.assetVouchers){
          this.state.assetVouchers.forEach( assetVoucher => {
            if(assetVoucher.asset.id === item.id) {
              item.isCheck = true;
            }
          })   
        }     
      })
      this.setState({ itemList: [...itemListClone], totalElements: data.totalElements },()=>{
        
      })
      });
  }

  componentDidMount() {
    this.updatePageData();
  }

  handleClick = (event, item) => {
    // console.log(item)
    document.querySelector(`#radio${item.id}`).click();
    item.isCheck = event.target.checked;
     let { assetVouchers } = this.state;
     if(assetVouchers == null){
      assetVouchers = [];
     }
    if (assetVouchers != null && assetVouchers.length == 0 && item.isCheck == true) {
        let p = {};
        p.asset = item;

        assetVouchers.push(p);
    }
    else{
        let itemInList = false;
        assetVouchers.forEach((el)=>{
            if(el.asset.id == item.id ){
                itemInList = true;
            }
        });
        if (!itemInList && item.isCheck == true) {
            let p = {};
            p.asset = item;
    
            assetVouchers.push(p);
        }
        else{
          if(item.isCheck === false){
            assetVouchers = assetVouchers.filter(assetVoucher => 
              assetVoucher.asset.id !== item.id
            )
          } 

           

        }
    }
       this.setState({ assetVouchers: assetVouchers}, function () {
       });
    // else {
    //   this.setState({ selectedValue: null, selectedItem: null });
    // }
  }

  componentWillMount() {
    let { open, handleClose, selectedItem, assetVouchers,handoverDepartment,managementDepartmentId } = this.props;
    //this.setState(item);
    this.setState({ assetVouchers:assetVouchers,handoverDepartment,managementDepartmentId });
  }


  // search() {
  //   this.setPage(0, function () {
  //     var searchObject = {};
  //     searchObject.keyword = this.state.keyword;
  //     searchObject.pageIndex = this.state.page;
  //     searchObject.pageSize = this.state.rowsPerPage;
  //     searchByPage(searchObject).then(({ data }) => {
  //       this.setState({ itemList: [...data.content], totalElements: data.totalElements })
  //     });
  //   });
  // };
  search() {
    this.setPage(0, function () {
      let status = 0;
      var searchObject = {};
      searchObject.voucherType = this.props.voucherType;
      searchObject.userDepartmentId = this.props.userDepartmentId;
      searchObject.managementDepartmentId = this.props.handoverDepartment ? this.props.handoverDepartment.id:"";
      searchObject.keyword = this.state.keyword;
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.indexOrder = status;
      searchByPage(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content], totalElements: data.totalElements })
      });
    });
  };

  handleChange = (event, source) => {
    event.persist();
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
    const { t, i18n, handleClose, handleSelect, selectedItem, open } = this.props;
    let { keyword, shouldOpenProductDialog, itemList, assetVouchers } = this.state;
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",        
        cellStyle:{
          padding:'0px',
          paddingLeft:'10px',  
        },        
        render: rowData => <Checkbox id={`radio${rowData.id}`} name="radSelected" value={rowData.id} 
        checked={rowData.isCheck} 
        onClick={(event) => this.handleClick(event, rowData)}
        />
      },
      { title: t("component.asset.code"), field: "code", align: "left", width: "150" },
      { title: t("component.asset.name"), field: "name", align: "left", width: "150" },
    ];
    return (
      <Dialog onClose={handleClose} open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="mb-20">{t("component.asset.title")}</span>
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
              onKeyUp={this.handleKeyUp}
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
                var list = rows.find(a => a.id === row.parentId);
                return list;
              }}
              options={{
                toolbar: false,
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
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
              labelDisplayedRows={ ({ from, to, count }) => `${from}-${to} ${t('general.of')} ${count !== -1 ? count : `more than ${to}`}`}
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
            className="mb-16 mr-36 align-bottom"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}>{t('general.cancel')}</Button>
          <Button className="mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => handleSelect(assetVouchers)}>
            {t('general.select')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default SelectAssetAllPopop;