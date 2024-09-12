import { Grid, MuiThemeProvider, TextField, Button, InputAdornment, Input,TableHead, TableCell, TableRow, Checkbox, TablePagination, Radio, Dialog, DialogActions } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import { searchByPage } from "../../ProductAttribute/ProductAttributeService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import ProductAttributeEditorDialog from '../../ProductAttribute/ProductAttributeEditorDialog'
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class SelectProductAttributespopup extends React.Component {
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
    attribute:[],
    shouldOpenProductAttributeDialog:false
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
    searchObject.keyword = this.state.keyword;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchByPage(searchObject).then(({ data }) => {
      // nếu id của 5 cái này có trong properties thì sẽ thay trạng thái isCheck bằng true
      let itemListClone = [...data.content]
      itemListClone.map( item => {
        if(this.state.attribute){
          this.state.attribute.forEach( proper => {
            if(proper.id === item.id) {
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
    let {attribute } = this.state
    if(attribute == null){
        attribute = [];
    }
    if (attribute != null && attribute.length == 0 && item.isCheck == true) {
        let p = {};
        p = item;
        attribute.push(p);
    }
    else{
        let itemInList = false;
        attribute.forEach((el)=>{
            if(el.id == item.id ){
                itemInList = true;
            }
        });
        if (!itemInList && item.isCheck == true) {
            let p = {};
            p = item;    
            attribute.push(p);
        }
        else{
          if(item.isCheck === false){
            attribute = attribute.filter(proper => 
              proper.id !== item.id
            )
          }        
        }
    }
    this.setState({ attribute: attribute}, function () {      
    });
    
  }

  componentWillMount() {
    let { open, handleClose, selectedItem, attribute } = this.props;
    //this.setState(item);
    this.setState({ attribute:attribute });
    
  }

  handleKeyDownEnterSearch = e => {
    if (e.key === 'Enter') {
      this.search();
    }
  };

  handleKeyUp = e => {
    this.search()
  }

  search() {
    this.setPage(0, function () {
      var searchObject = {};
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

  handleOpenProductAttributeDialog = () => {
    this.setState({
      shouldOpenProductAttributeDialog: true
    })
  }

  handleDialogProductAttributeClose = () => {
    this.setState({
      shouldOpenProductAttributeDialog: false
    })
  }

  handleOKEditClose = () => {
    this.setState({
      shouldOpenProductDialog: false,
      shouldOpenProductAttributeDialog: false
    });
    this.updatePageData();
  };

  onClickRow = (selectedRow) => {
    document.querySelector(`#radio${selectedRow.id}`).click();
  }

  render() {
    const { t, i18n, handleClose, handleSelect, selectedItem, open } = this.props;
    let { keyword, shouldOpenProductDialog, itemList, attribute, shouldOpenProductAttributeDialog } = this.state;
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",
        cellStyle : {
          paddingTop: '0px',
          paddingBottom: '0px'
        },
        render: rowData => <Checkbox id={`radio${rowData.id}`} name="radSelected" value={rowData.id} 
        checked={rowData.isCheck} 
        onClick={(event) => this.handleClick(event, rowData)}
        />
      },
      { title: t("general.code"), field: "code", align: "left", width: "150" },
      { title: t("general.name"), field: "name", width: "150" },
    ];
    return (
      <Dialog onClose={handleClose} open={open} PaperComponent={PaperComponent} maxWidth={'md'} fullWidth>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <span className="mb-20">{t("ProductAttribute.title")}</span>
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
              { itemList.length !== 0 ? '' :
                <Button className="mb-16 mr-16 align-bottom"
                  variant="contained"
                  color="primary"
                  onClick={() => this.handleOpenProductAttributeDialog()}
                  >
                  {t('ProductAttribute.add')}
                </Button>
              }
          </Grid>
          <div>
              {shouldOpenProductAttributeDialog && (
                <ProductAttributeEditorDialog t={t} i18n={i18n}
                  handleClose={this.handleDialogProductAttributeClose}
                  open={shouldOpenProductAttributeDialog}
                  handleOKEditClose={this.handleOKEditClose}
                  item={{}}
                />
              )}
            </div>
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
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF'
                }), 
                maxBodyHeight: '253px',
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
                padding: 'dense',
                minBodyHeight: "253px"
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
            className="mb-16 mr-12 align-bottom"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}>{t('general.cancel')}</Button>
          <Button className="mb-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => handleSelect(attribute)}>
            {t('general.select')}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
export default SelectProductAttributespopup;