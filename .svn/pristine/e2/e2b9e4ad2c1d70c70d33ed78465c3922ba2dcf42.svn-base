import {
  Grid,
  FormControl,
  InputLabel,
  Button,
  Input,
  Checkbox,
  TablePagination,
  InputAdornment,
  Dialog,
  DialogActions,
  IconButton,Radio
} from "@material-ui/core";
import React, { Component } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader
} from "material-table";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { searchByPage } from "../../EQASerumBottle/EQASerumBottleService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import '../../../../styles/views/_style.scss';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
class EQASerumBottleSelectMultiple extends React.Component {
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
    text: "",
    shouldOpenProductDialog: false,
    eQASerumBottle: []
  };

  setPage = page => {
    this.setState({ page }, function() {
      this.updatePageData();
    });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page: 0 }, function() {
      this.updatePageData();
    });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  search() {
    this.setPage(0, function() {
      var searchObject = {};
      searchObject.text = this.state.text;
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;
      searchObject.checkBottle = true;
      searchByPage(searchObject).then(({ data }) => {
        let { eQASerumBottle } = this.state;
        // nếu đã có trong list chọn rồi thì sẽ thay trạng thái isCheck bằng true
        let itemListClone = [...data.content];

        itemListClone.map(item => {
          const found = eQASerumBottle.find(
            obj => obj.eQASerumBottle.id == item.id
          );
          if (found) {
            item.isCheck = true;
          } else {
            item.isCheck = false;
          }
        });
        this.setState(
          { itemList: itemListClone, totalElements: data.totalElements },
          () => {}
        );
      });
    });
  }

  updatePageData = () => {
    var searchObject = {};
    searchObject.text = this.state.text;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.checkBottle = true;
    searchByPage(searchObject).then(({ data }) => {
      let { eQASerumBottle } = this.state;
      // nếu đã có trong list chọn rồi thì sẽ thay trạng thái isCheck bằng true
      let itemListClone = [...data.content];

      itemListClone.map(item => {
        const found = eQASerumBottle.find(
          obj => obj.eQASerumBottle.id == item.id
        );
        if (found) {
          item.isCheck = true;
        } else {
          item.isCheck = false;
        }
      });
      this.setState(
        { itemList: itemListClone, totalElements: data.totalElements },
        () => {}
      );
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  handleClick = (event, item) => {
    item.isCheck = event.target.checked;
    let { eQASerumBottle } = this.state;
    if (eQASerumBottle == null) {
      eQASerumBottle = [];
    }
    if (
      eQASerumBottle != null &&
      eQASerumBottle.length == 0 &&
      item.isCheck == true
    ) {
      let p = {};
      p.eQASerumBottle = item;
      eQASerumBottle.push(p);
    } else {
      let itemInList = false;
      eQASerumBottle.forEach(el => {
        if (el.eQASerumBottle.id == item.id) {
          itemInList = true;
        }
      });
      if (!itemInList && item.isCheck == true) {
        let p = {};
        p.eQASerumBottle = item;
        eQASerumBottle.push(p);
      } else {
        if (item.isCheck === false) {
          eQASerumBottle = eQASerumBottle.filter(
            proper => proper.eQASerumBottle.id !== item.id
          );
        }
      }
    }
    this.setState({ eQASerumBottle });
  };

  componentWillMount() {
    let { open, handleClose, selectedItem, eQASerumBottle } = this.props;
    if(eQASerumBottle != null && eQASerumBottle.length > 0){
      const eqaSerumBottle  = [...eQASerumBottle];
      this.setState({ eQASerumBottle: eqaSerumBottle });
    }
  }

  clearKeyword = () => {
    this.setState({ text: "" }, function() {});
  };

  handleKeyDownEnterSearch = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  handleOpenProductDialog = () => {
    this.setState({
      shouldOpenProductDialog: true
    });
  };

  handleDialogProductClose = () => {
    this.setState({
      shouldOpenProductDialog: false
    });
  };

  handleOKEditClose = () => {
    this.setState({
      shouldOpenProductDialog: false
    });
    this.updatePageData();
  };

  onClickRow = selectedRow => {
    document.querySelector(`#radio${selectedRow.id}`).click();
  };

  render() {
    const { t, i18n, handleClose, handleSelect, open } = this.props;
    let {
      text,
      shouldOpenProductDialog,
      itemList,
      eQASerumBottle
    } = this.state;
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",
        render: rowData => (
          <Checkbox
            id={`radio${rowData.id}`}
            name="radSelected"
            value={rowData.id}
            checked={rowData.isCheck}
            onClick={event => this.handleClick(event, rowData)}
          />
        )
      },
      {
        title: t("SampleManagement.tube_code"),
        field: "code",
        align: "left",
        width: "150"
      },
      {
        title: t("SampleManagement.serum-bottle.serum_code"),
        field: "eqaSerumBank.serumCode",
        width: "150"
      },
      // { title: t('SampleManagement.serum-bottle.resultBottle'), field: "resultBottle", align: "left", width: "150",
      // render: rowData => <Radio name="radSelected" value={rowData.resultBottle} checked={(rowData.resultBottle == null || rowData.resultBottle) ? false:true } 
      // /> },
    ];
    return (
      <Dialog
        onClose={handleClose}
        open={open}
        PaperComponent={PaperComponent}
        maxWidth={"md"}
        fullWidth
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          <span className="mb-20 styleColor">
            {t("eQASerumBottle.title_popup_select")}
          </span>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="standard-adornment-amount">
                  {t("EnterSearch")}
                </InputLabel>
                <Input
                  id="standard-adornment-amount"
                  name="text"
                  value={text}
                  onKeyDown={this.handleKeyDownEnterSearch}
                  onChange={this.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon onClick={() => this.search(text)} />
                      </IconButton>
                    </InputAdornment>
                  }
                  // startAdornment={<InputAdornment position="start"><IconButton><SearchIcon /></IconButton></InputAdornment>}
                  // endAdornment={
                  //     <InputAdornment position="end">
                  //         <IconButton
                  //             aria-label=""
                  //             onClick={() => this.clearKeyword()}
                  //         >
                  //             <CloseIcon />
                  //         </IconButton>
                  //     </InputAdornment>
                  // }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MaterialTable
                data={itemList}
                columns={columns}
                // onRowClick={((evt, selectedRow) => this.onClickRow(selectedRow))}
                options={{
                selection: false,
                actionsColumnIndex: -1,
                paging: false,
                search: false,
                rowStyle: rowData => ({
                  backgroundColor: (rowData.tableData.id % 2 === 1) ? '#EEE' : '#FFF',
                }), 
                headerStyle: {
                  backgroundColor: '#358600',
                  color:'#fff',
                },
                padding: 'dense',
                toolbar: false
              }}
                components={{
                  Toolbar: props => (
                    <div style={{ witdth: "100%" }}>
                      <MTableToolbar {...props} />
                    </div>
                  )
                }}
                onSelectionChange={rows => {
                  this.data = rows;
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
                labelRowsPerPage={t("general.rows_per_page")}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${t("general.of")} ${
                    count !== -1 ? count : `more than ${to}`
                  }`
                }
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            className="mb-16 mr-36 align-bottom"
            variant="contained"
            color="secondary"
            onClick={() => handleClose()}
          >
            {t("general.cancel")}
          </Button>
          <Button
            className="mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => handleSelect(eQASerumBottle)}
          >
            {t("general.select")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default EQASerumBottleSelectMultiple;
