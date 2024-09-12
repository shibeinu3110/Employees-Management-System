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
    Tooltip,
    FormControl,
    Input,
    InputAdornment,
  } from "@material-ui/core";
  import { createMuiTheme } from "@material-ui/core/styles";
  import React, { Component } from "react";
  import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
  import MaterialTable, {
    MTableToolbar,
    Chip,
    MTableBody,
    MTableHeader,
  } from "material-table";
  import { useTranslation, withTranslation, Trans } from "react-i18next";
  
  import {
    searchByPage,
    handleDeleteList,
    getFlatRootChild,
    getAllByRoot,
    deleteItem,
    saveItem,
    getItemById,
    getAllItem,
    deleteCheckItem,
  } from "./CategoryService";
  
  
  import AgencyDialog from "./CategoryDialog";
  import { Breadcrumb, ConfirmationDialog } from "egret";
  import { Helmet } from "react-helmet";
  import { withStyles } from "@material-ui/core/styles";
  import SearchIcon from "@material-ui/icons/Search";
  import { Link } from "react-router-dom";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  toast.configure({
    autoClose: 2000,
    draggable: false,
    limit: 3,
  });
  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
      position: "absolute",
      top: "-15px",
      left: "-30px",
      width: "80px",
    },
  }))(Tooltip);
  
  function MaterialButton(props) {
    const { t, i18n } = useTranslation();
    const item = props.item;
    return (
      <div className="none_wrap">
        <LightTooltip
          title={t("general.editIcon")}
          placement="right-end"
          enterDelay={300}
          leaveDelay={200}
        >
          <IconButton size="small" onClick={() => props.onSelect(item, 0)}>
            <Icon fontSize="small" color="primary">
              edit
            </Icon>
          </IconButton>
        </LightTooltip>
        <LightTooltip
          title={t("general.deleteIcon")}
          placement="right-end"
          enterDelay={300}
          leaveDelay={200}
        >
          <IconButton size="small" onClick={() => props.onSelect(item, 1)}>
            <Icon fontSize="small" color="error">
              delete
            </Icon>
          </IconButton>
        </LightTooltip>
      </div>
    );
  }
  class Category extends React.Component {
    state = {
      rowsPerPage: 10,
      page: 0,
      data: [],
      totalElements: 0,
      itemList: [],
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
      shouldOpenConfirmationDeleteAllDialog: false,
      keyword: "",
      shouldOpenNotificationPopup: false,
      Notification: "",
    };
    constructor(props) {
      super(props);
      //this.state = {keyword: ''};
      this.handleTextChange = this.handleTextChange.bind(this);
    }
    handleTextChange(event) {
      this.setState({ keyword: event.target.value });
    }
  
    handleKeyDownEnterSearch = (e) => {
      if (e.key === "Enter") {
        this.search();
      }
    };
    componentDidMount() {
      this.updatePageData();
    }
    
  
    search() {
      this.setState({ page: 0 }, function () {
        var searchObject = {};
        searchObject.keyword = this.state.keyword;
        searchObject.pageIndex = this.state.page + 1 ;
        searchObject.pageSize = this.state.rowsPerPage;
        searchByPage(searchObject).then(res => {
          this.setState({ itemList: [...res.data.content],totalElements: res.data.totalElements })
        }).catch(err=>{console.log(err)});
      });
    }
  
    updatePageData = () => {
      var searchObject = {};
      searchObject.keyword = "";
      searchObject.pageIndex = this.state.page + 1;
      searchObject.pageSize = this.state.rowsPerPage;
      searchByPage(searchObject).then(({ data }) => {
        this.setState({ itemList: [...data.content],totalElements: data.totalElements, })
      });
    };
    setPage = (page) => {
      this.setState({ page }, function () {
        this.updatePageData();
      });
    };
  
    setRowsPerPage = (event) => {
      this.setState({ rowsPerPage: event.target.value, page: 0 }, function () {
        this.updatePageData();
      });
    };
  
    handleChangePage = (event, newPage) => {
      this.setPage(newPage);
    };
  
    handleOKEditClose = () => {
      this.setState(
        {
          shouldOpenEditorDialog: false,
          shouldOpenConfirmationDialog: false,
        },
        () => {
          this.updatePageData();
        }
      );
    };
  
    handleDelete = (id) => {
      this.setState({
        id,
        shouldOpenConfirmationDialog: true,
      });
    };
    handleDialogClose = () => {
      this.setState(
        {
          shouldOpenEditorDialog: false,
          shouldOpenConfirmationDialog: false,
          shouldOpenConfirmationDeleteAllDialog: false,
          shouldOpenNotificationPopup: false,
          data: [],
        },
        () => {
          this.updatePageData();
        }
      );
    };
  
    handleOKEditClose = () => {
      this.setState({
        shouldOpenEditorDialog: false,
        shouldOpenConfirmationDialog: false,
        shouldOpenConfirmationDeleteAllDialog: false,
      });
      this.setPage(0);
    };
  
    handleDelete = (id) => {
      this.setState({
        id,
        shouldOpenConfirmationDialog: true,
      });
    };
  
    handleConfirmationResponse = () => {
      let {t} = this.props
      if (this.state.itemList.length === 1 && this.state.page === 1) {
        let count = this.state.page - 1;
        this.setState({
          page: count,
        })
      }
      deleteItem(this.state.id).then(() => {
        this.updatePageData();
        this.handleDialogClose();
        toast.success(t("Xóa thành công"));
      }).catch(() => {
        toast.warning(t("Không thể xóa danh mục này"));
      });
    };
    handleEditItem = (item) => {
      this.setState({
        item: item,
        shouldOpenEditorDialog: true,
      });
    };
    handleDeleteButtonClick = () => {
      let { t } = this.props
      if (!this.data || this.data.length === 0) {
      toast.warning(t("general.noti_check_data"));

    } else if (this.data.length === this.state.itemList.length) {
      this.setState({ shouldOpenConfirmationDeleteAllDialog: true });
    } else {
      this.setState({ shouldOpenConfirmationDeleteAllDialog: true });
    }
    };
    async handleDeleteList(list) {
      let listAlert = [];
      var { t } = this.props;
      for (var i = 0; i < list.length; i++) {
        try {
          await deleteItem(list[i].id);
        } catch (error) {
          listAlert.push(list[i].name);
        }
      }
      this.handleDialogClose();
      if (listAlert.length === list.length) {
        toast.warning(t("Danh mục đã được sử dụng"));
        // alert("Các trạng thái đều đã sử dụng");
      } else if (listAlert.length > 0) {
        toast.warning(t("Đã xoá các danh mục chưa sử dụng"));
        // alert("Đã xoá các trạng thái chưa sử dụng");
      }
    }
     handleDeleteAll = (event) => {
      this.handleDeleteList(this.data)
        .then(() => {
          this.updatePageData();
          toast.success("Xóa thành công");
          this.data = null;
        })
        .catch((err) => {
          console.log("loi");
        });
    };
  
    render() {
      const { t, i18n } = this.props;
      let { keyword, shouldOpenNotificationPopup } = this.state;
      let TitlePage = t("Danh mục sản phẩm");
  
      let columns = [
        {
          title: t("general.action"),
          field: "custom",
          align: "left",
          width: "120px",
          headerStyle: {
            padding: "0px",
          },
          cellStyle: {
            padding: "0px",
          },
          render: (rowData) => (
            <MaterialButton
              item={rowData}
              onSelect={(rowData, method) => {
                if (method === 0) {
                  getItemById(rowData.id).then(({ data }) => {
                    if (data.parent === null) {
                      data.parent = {};
                    }
                    this.setState({
                      item: data,
                      shouldOpenEditorDialog: true,
                    });
                  });
                } else if (method === 1) {
                  this.handleDelete(rowData.id);
                } else {
                  alert("Call Selected Here:" + rowData.id);
                }
              }}
            />
          ),
        },
        { title: t("general.name"), field: "name", width: "150" },
        { title: t("general.code"), field: "code", align: "left", width: "150" },    
      ];
      console.log(this.state.itemList);
      return (
        <div className="m-sm-30">
           
          <Grid container spacing={2} justify="space-between">
            <Grid item md={3} xs={12}>
              <Button
                className="align-bottom mr-16 mb-16"
                variant="contained"
                color="primary"
                onClick={() => this.handleEditItem(null)}
              >
                {t("general.add")}
              </Button>
              <Button
                className="align-bottom mb-16"
                variant="contained"
                color="primary"
                onClick={this.handleDeleteButtonClick}
              >
                {t("general.delete")}
              </Button>
  
              {this.state.shouldOpenConfirmationDeleteAllDialog && (
                <ConfirmationDialog
                  open={this.state.shouldOpenConfirmationDeleteAllDialog}
                  onConfirmDialogClose={this.handleDialogClose}
                  onYesClick={this.handleDeleteAll}
                  title={t("confirm")}
                  text={t('DeleteAllConfirm')}
                  Yes={t('general.Yes')}
                  No={t('general.No')}
                />
              )}
              
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <FormControl fullWidth style={{ marginTop: "6px" }}>
                <Input
                  className="search_box w-100"
                  onChange={this.handleTextChange}
                  onKeyDown={this.handleKeyDownEnterSearch}
                  placeholder={t("general.enterKeyword")}
                  id="search_box"
                  startAdornment={
                    <InputAdornment>
                      <Link>
                        {" "}
                        <SearchIcon
                          onClick={() => this.search(keyword)}
                          style={{ position: "absolute", top: "0", right: "0" }}
                        />
                      </Link>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <div>
                {this.state.shouldOpenEditorDialog && (
                  <AgencyDialog
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
                    title={t("general.confirm")}
                    open={this.state.shouldOpenConfirmationDialog}
                    onConfirmDialogClose={this.handleDialogClose}
                    onYesClick={this.handleConfirmationResponse}
                    title={t("confirm")}
                    text={t('DeleteConfirm')}
                    Yes={t('general.Yes')}
                    No={t('general.No')}
                  />
                )}
              </div>
              <MaterialTable
                title={t("general.list")}
                data={this.state.itemList}
                columns={columns}
                //parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
                parentChildData={(row, rows) => {
                  var list = rows.find((a) => a.id === row.parentId);
                  return list;
                }}
                localization={{
                  body: {
                    emptyDataSourceMessage: `${t(
                      "general.emptyDataMessageTable"
                    )}`,
                  },
                  toolbar: {
                    // nRowsSelected: `${t('general.selects')}`,
                    nRowsSelected: `${t("general.selects")}`,
                  },
                }}
                options={{
                  selection: true,
                  actionsColumnIndex: -1,
                  paging: false,
                  search: false,
                  rowStyle: (rowData) => ({
                    backgroundColor:
                      rowData.tableData.id % 2 === 1 ? "#EEE" : "#FFF",
                  }),
                  maxBodyHeight: "1000px",
                  minBodyHeight: "370px",
                  headerStyle: {
                    backgroundColor: "#358600",
                    color: "#fff",
                  },
                  padding: "dense",
                  toolbar: false,
                }}
                components={{
                  Toolbar: (props) => <MTableToolbar {...props} />,
                }}
                onSelectionChange={(rows) => {
                  this.data = rows;
                }}
                // actions={[
                //   {
                //     tooltip: 'Remove All Selected Users',
                //     icon: 'delete',
                //     onClick: (evt, data) => {
                //       this.handleDeleteAll(data);
                //       console.log(data)
                //       alert('You want to delete ' + data.length + ' rows');
                //     }
                //   },
                // ]}
              />
              <TablePagination
                align="left"
                className="px-16"
                rowsPerPageOptions={[1, 2, 3, 5, 10, 25]}
                component="div"
                labelRowsPerPage={t("general.rows_per_page")}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} ${t("general.of")} ${
                    count !== -1 ? count : `more than ${to}`
                  }`
                }
                count={this.state.totalElements}
                rowsPerPage={this.state.rowsPerPage}
                page={this.state.page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.setRowsPerPage}
              />
            </Grid>
          </Grid>
        </div>
      );
    }
  }
  export default Category;
  