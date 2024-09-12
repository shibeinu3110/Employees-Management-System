import React from "react";
import "./styles.css";

// import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)

// for React 16.4.x use: import { ReactTabulator }
//import { React15Tabulator } from "react-tabulator"; // for React 15.x
import { React15Tabulator, reactFormatter } from "react-tabulator"; // for React 15.x

import { saveAs } from 'file-saver';
import { getAllAdministrativeUnits, deleteAdministrativeUnit, getByPage } from "./AdministrativeUnitService";
import AdministrativeUnitEditorDialog from "./AdministrativeUnitEditorDialog";
import { Breadcrumb, ConfirmationDialog } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import {
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Icon,
  TablePagination,
  TableContainer,
  Button,
  Card
} from "@material-ui/core";
const columns = [
  { title: "Name", field: "name", width: "20%"},
  { title: "Age", field: "age", align: "left", formatter: "progress" , width: "20%" },
  { title: "Favourite Color", field: "col" , width: "20%"  },
  { title: "Date Of Birth", field: "dob", align: "center" , width: 150 },
  { title: "Rating", field: "rating", align: "center", formatter: "star" , width: 150 },
  { title: "Passed?", field: "passed", align: "center", formatter: "tickCross" , width: 150 }
];
// const columns = [
//   { title: "Name", field: "name", width: "30%"},
//   { title: "Code", field: "code", align: "left", formatter: "progress" , width: "40%" },
//   { title: "Level", field: "level" , width: "30%"  },
// ];

function SimpleButton(props) {
  const { t, i18n } = useTranslation();
  const cellData = props.cell._cell.row.data;
  return <div> 
    <button onClick={() => props.onSelect(cellData,0)}>{t("Edit")}</button> 
    <button onClick={() => props.onSelect(cellData,1)}>{t("Delete")}</button> 
    </div>;
}

// function GetColumns(){
//   const { t, i18n } = useTranslation();
//   const columns = [
//     { title: t("Name"), field: "name", width: "150"},
//     { title: t("Code"), field: "code", align: "left", width: "150"},
//     { title: t("Level"), field: "level", width: "150"},
//     { title: t("IsActive"), field: "isActive", width: "20%"},
//     {
//       title: t("Action"),
//       field: "custom",
//       align: "left",
//       width: "250",
//       formatter: reactFormatter(
//         <SimpleButton
//           onSelect={(item, method) => {
//             if(method===0){
//               this.setState({ selectedItem: item, shouldOpenEditorDialog: true});
//             }else {
//               this.handleDeleteAdministrativeUnit(item.id);
//             }
//           }}
//         />
//       )
//     }
//   ];
//   return columns;
// }
function DeleteData(cellData){
  alert(cellData.id);
}
const data = [
  {
    id: 1,
    name: "Oli Bob",
    age: "12",
    col: "red",
    dob: "",
    rating: 5,
    passed: true
  },
  {
    id: 2,
    name: "Mary May",
    age: "1",
    col: "green",
    dob: "14/05/1989",
    rating: 4,
    passed: true
  },
  {
    id: 3,
    name: "Christine Lobowski",
    age: "42",
    col: "green",
    dob: "22/05/1985",
    rating: 4,
    passed: false
  },
  {
    id: 4,
    name: "Brendon Philips",
    age: "125",
    col: "red",
    dob: "01/08/1980",
    rating: 4.5,
    passed: true
  },
  {
    id: 5,
    name: "Margret Marmajuke",
    age: "16",
    col: "yellow",
    dob: "31/01/1999",
    rating: 4,
    passed: false
  },
  {
    id: 6,
    name: "Van Ng",
    age: "37",
    col: "green",
    dob: "06/15/1982",
    rating: 4,
    passed: true
  },
  {
    id: 7,
    name: "Duc Ng",
    age: "37",
    col: "yellow",
    dob: "10/15/1982",
    rating: 4,
    passed: true
  }
];

// Editable Example:
const colorOptions = {
  [""]: "&nbsp;",
  red: "red",
  green: "green",
  yellow: "yellow"
};
const editableColumns = [
  {
    title: "Name",
    field: "name",
    width: 150,
    editor: "input",
    headerFilter: "input"
  },
  {
    title: "Age",
    field: "age",
    align: "left",
    formatter: "progress",
    editor: "progress"
  },
  {
    title: "Favourite Color",
    field: "col",
    editor: "autocomplete",
    editorParams: {
      allowEmpty: true,
      showListOnEmpty: true,
      values: colorOptions
    },
    headerFilter: "select",
    headerFilterParams: { values: colorOptions }
  },
  { title: "Date Of Birth", field: "dob", align: "center", editor: "input" },
  {
    title: "Rating",
    field: "rating",
    align: "center",
    formatter: "star",
    editor: true
  },
  {
    title: "Passed?",
    field: "passed",
    align: "center",
    formatter: "tickCross",
    editor: true
  }
];

class React15TabulatorSample extends React.Component {
  ref = null;
  state = {
    rowsPerPage: 3,
    page: 0,
    data: [],
    totalElements:0,
    administrativeList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false
  };
  SimpleButton=(props)=>{
    const cellData = props.cell._cell.row.data;
    return <div> 
      <button onClick={() => props.onSelect(cellData,0)}>Edit</button> 
      <button onClick={() => props.onSelect(cellData,1)}>Delete</button> 
      </div>;
  }
  setPage = page => {
    this.setState({ page });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value, page:0});
    this.updatePageData(0,event.target.value);
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
    //alert(newPage+"/"+this.state.page);
    this.updatePageData(newPage,this.state.rowsPerPage);
  };
  handleDownload = () => {
    var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "hello world.txt");    
  }
  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false
    });
    this.setPage(0);
    this.updatePageData(this.state.page,this.state.rowsPerPage);
  };

  handleDeleteAdministrativeUnit = id => {
    this.setState({
      id,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    //alert(this.state.id);
    deleteAdministrativeUnit(this.state.id).then(() => {
      this.handleDialogClose();
    });
  };
  handleEditItem = item => {
    this.setState({
      item:item,
      shouldOpenEditorDialog: true
    });
  };
  componentDidMount() {
    this.updatePageData(this.state.page,this.state.rowsPerPage);
  }

  updatePageData = (pageIndex, pageSize) => { 
    getByPage(pageIndex,pageSize).then(({ data }) => this.setState({
       administrativeList: [...data.content], totalElements:data.totalElements
      }));
  };



  rowClick = (e, row) => {
    console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
    console.log("rowClick id: ${row.getData().id}", row, e);
  };

  setData = () => {
    this.setState({ data:this.state.administrativeList });
  };

  clearData = () => {
    this.setState({ data: [] });
  };
  GetColumns = (col)=>{
    return col;
  } 
  

  rowClick = (e, row) => {
    //alert(row.getData().name);
    this.setState({item:row.getData()});
    console.log("ref table: ", this.ref.table); // this is the Tabulator table instance
    console.log("rowClick id: ${row.getData().id}", row, e);
    this.setState({ selectedName: row.getData().name });
  };
  render() {
    const { t, i18n } = this.props;
    let columns = [
      { title: t("Name"), field: "name", width: "150"},
      { title: t("Code"), field: "code", align: "left", width: "150"},
      { title: t("Level"), field: "level", width: "150"},
      { title: t("IsActive"), field: "isActive", width: "20%"},
      {
        title: t("Action"),
        field: "custom",
        align: "left",
        width: "250",
        formatter: reactFormatter(
          <SimpleButton
            onSelect={(item, method) => {
              if(method===0){
                this.setState({ selectedItem: item, shouldOpenEditorDialog: true});
              }else {
                this.handleDeleteAdministrativeUnit(item.id);
              }
            }}
          />
        )
      }
    ];
    const options = {
      height: "90%",
      movableRows: false
    };
  let {
      rowsPerPage,
      page,
      administrativeList,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog
    } = this.state;
    return (
      <div>
        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ shouldOpenEditorDialog: true,item:{} })}
        >
          {t('AdministrativeUnitTable.AddNew')}
        </Button>          
          {shouldOpenEditorDialog && (
            <AdministrativeUnitEditorDialog
              handleClose={this.handleDialogClose}
              open={this.state.shouldOpenEditorDialog}
              item={this.state.item}
            />
          )}   
          
          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleDialogClose}
              onYesClick={this.handleConfirmationResponse}
              text="Are you sure to delete?"
            />
          )
          }     
        <React15Tabulator
          ref={ref => (this.ref = ref)}
          columns={columns}
          data={administrativeList}
          rowClick={this.rowClick}
          options={options}
          data-custom-attr="test-custom-attribute"
          className="custom-css-class"
          resizableColumns="false" movableColumns="false" scrollToColumnIfVisible="true" selectableRollingSelection="false"
          //min-width="750px"
        />
        {/* <Pagination/> */}
      
          <TablePagination
            align="left"
            className="px-16"
            rowsPerPageOptions={[1,2,3,5, 10, 25]}
            component="div"
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
      </div>
    );
  }
}

export default React15TabulatorSample;
