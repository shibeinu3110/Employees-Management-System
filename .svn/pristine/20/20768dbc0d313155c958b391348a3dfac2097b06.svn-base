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
  FormControl,
  Input,
  InputAdornment
} from "@material-ui/core";
import { Link } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import React, { Component } from "react";
import MaterialTable, {
  MTableToolbar,
  Chip,
  MTableBody,
  MTableHeader
} from "material-table";
import { useTranslation, withTranslation, Trans } from "react-i18next";
import { searchByPage } from "../../EQAHealthOrgRoundRegister/EQAHealthOrgRoundRegisterService";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Draggable from "react-draggable";
import Paper from "@material-ui/core/Paper";
import AsynchronousAutocomplete from "../../utilities/AsynchronousAutocomplete";
import { searchByPage as searchByPageEQARound } from "../../EQARound/EQARoundService";
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
class SelectAssetPopup extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  state = {
    round: null,
    rowsPerPage: 5,
    page: 0,
    data: [],
    totalElements: 0,
    itemList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    selectedItem: {},
    text: ""
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

  updatePageData = () => {
    var searchObject = {};
    let { round } = this.state;
    if (round != null && round.id != null) {
      searchObject.roundId = this.state.round.id;
    }
    searchObject.text = this.state.text;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchObject.listStatus = [0, 1];
    searchByPage(searchObject).then(({ data }) => {
      this.setState({
        itemList: [...data.content],
        totalElements: data.totalElements
      });
    });
  };

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
  };

  componentWillMount() {
    let { open, handleClose, selectedItem } = this.props;
    //this.setState(item);
    this.setState({ selectedValue: selectedItem ? selectedItem.id : null });
  }

  handleKeyDownEnterSearch = e => {
    if (e.key === "Enter") {
      this.search();
    }
  };

  search() {
    this.setPage(0, function() {
      var searchObject = {};
      let { round } = this.state;
      if (round != null && round.id != null) {
        searchObject.roundId = this.state.round.id;
      }
      searchObject.text = this.state.text;
      searchObject.pageIndex = this.state.page;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(({ data }) => {
        this.setState({
          itemList: [...data.content],
          totalElements: data.totalElements
        });
      });
    });
  }

  handleChange = (event, source) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  selectEQARound = round => {
    this.setState({ round }, function() {
      this.search();
    });
  };

  render() {
    const { t, i18n, handleClose, handleSelect, open } = this.props;
    let { text, round, selectedItem } = this.state;
    let searchObject = { pageIndex: 0, pageSize: 1000000 };
    let columns = [
      {
        title: t("general.select"),
        field: "custom",
        align: "left",
        width: "250",
        render: rowData => (
          <Radio
            name="radSelected"
            value={rowData.id}
            checked={this.state.selectedValue === rowData.id}
            onClick={event => this.handleClick(event, rowData)}
          />
        )
      },
      {
        title: t("EQAHealthOrg.Code"),
        field: "healthOrg.code",
        align: "left",
        width: "150"
      },
      {
        title: t("EQAHealthOrg.Name"),
        field: "healthOrg.name",
        align: "left",
        width: "150"
      },
      {
        title: t("HealthOrgEQARoundPopup.round"),
        field: "round.name",
        align: "left",
        width: "150"
      }
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
          <span className="mb-20 styleColor">{t("HealthOrgEQARoundPopup.title")}</span>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container className="flex flex-end" spacing={2}>
            <Grid item md={6} sm={6} xs={6} className="mt-16">
              <AsynchronousAutocomplete
                label={t("HealthOrgEQARoundPopup.round")}
                searchFunction={searchByPageEQARound}
                searchObject={searchObject}
                displayLable={"code"}
                defaultValue={round}
                valueTextValidator={round}
                validators={["required"]}
                errorMessages={t("general.errorMessages_required")}
                onSelect={this.selectEQARound}
              />
            </Grid>
            <Grid item md={6} sm={6} xs={6} className="mt-32">
              <FormControl fullWidth>
                <Input
                  className="search_box w-100 stylePlaceholder"
                  name="text"
                  onChange={this.handleChange}
                  onKeyDown={this.handleKeyDownEnterSearch}
                  placeholder={t("general.enterSearch")}
                  id="search_box"
                  startAdornment={
                    <InputAdornment>
                      <Link to="#">
                        {" "}
                        <SearchIcon
                          onClick={() => this.search(text)}
                          style={{
                            position: "absolute",
                            top: "0",
                            right: "0"
                          }}
                        />
                      </Link>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} className="mt-36">
            <MaterialTable
              data={this.state.itemList}
              columns={columns}
              parentChildData={(row, rows) => {
                var list = rows.find(a => a.id === row.parentId);
                return list;
              }}
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
            onClick={() => handleClose()}
          >
            {t("general.cancel")}
          </Button>

          <Button
            className="mb-16 mr-16 align-bottom"
            variant="contained"
            color="primary"
            onClick={() => handleSelect(selectedItem)}
          >
            {t("general.select")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
export default SelectAssetPopup;
