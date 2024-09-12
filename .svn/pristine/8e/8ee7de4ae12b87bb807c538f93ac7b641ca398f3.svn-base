import React, { Component } from "react";
import { Breadcrumb, SimpleCard, EgretProgressBar } from "egret";
import { Fab, Icon, Card, Grid, Divider, Button } from "@material-ui/core";
import MaterialTable, { MTableToolbar, Chip, MTableBody, MTableHeader } from 'material-table';

import axios from "axios";
import ConstantList from "../../appConfig";
import UploadFormDialog from "./UploadFormDialog";
import UploadSingleFileDialog from "./UploadSingleFileDialog";
import UploadCropImageDialog from "./UploadCropImageDialog";
class UploadForm extends Component {
  state = {
    dragClass: "",
    files: [],
    statusList: [],
    queProgress: 0,
    itemList: [],
    shouldOpenUploadDialog: false,
    shouldOpenUploadImageDialog: false,
    shouldOpenSingleFileUploadDialog:false
  };
 
  getListFileItem(){
    //const url =ConstantList.API_ENPOINT+"/api/fileUpload/uploadfile";
    const url =ConstantList.API_ENPOINT+"/api/file/1/10";
    return  axios.get(url);
  }


  uploadSingleFile = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];
    this.fileUpload(file.file).then(res => {
        alert("File uploaded successfully.")
      })

    allFiles[index] = { ...file, uploading: true, error: false };

    this.setState({
      files: [...allFiles]
    });
  };

  uploadAllFile = () => {
    let allFiles = [];

    this.state.files.map(item => {
      allFiles.push({
        ...item,
        uploading: true,
        error: false
      });

      return item;
    });

    this.setState({
      files: [...allFiles],
      queProgress: 35
    });
  };

  handleSingleCancel = index => {
    let allFiles = [...this.state.files];
    let file = this.state.files[index];

    allFiles[index] = { ...file, uploading: false, error: true };

    this.setState({
      files: [...allFiles]
    });
  };

  handleCancelAll = () => {
    let allFiles = [];

    this.state.files.map(item => {
      allFiles.push({
        ...item,
        uploading: false,
        error: true
      });

      return item;
    });

    this.setState({
      files: [...allFiles],
      queProgress: 0
    });
  };
  componentDidMount() {
    this.getListFileItem().then(res => {
      // console.log(res);
      this.setState({itemList:res.data.content});
      //alert("File get list successfully.")
      });
  }
  downloadFile(data){
    const url =ConstantList.API_ENPOINT+"/public/file/downloadbyid/"+data.id;
    window.open(url, "_blank");
  }
  handleDialogClose = () => {
    this.setState({
      shouldOpenUploadDialog: false,
      shouldOpenSingleFileUploadDialog:false,
      shouldOpenUploadImageDialog:false
    });
  };
  render() {
    const { t, i18n } = this.props;
    let { dragClass, files, queProgress,itemList } = this.state;
    // console.log(itemList);
    let isEmpty = files.length === 0;
    let columns = [
      { title: "File name", field: "name", width: "150" },
      { title: "fileSize", field: "fileSize", align: "left", width: "150" },
    ];
    // itemList =this.getListFileItem().then(res => {
    //   alert("File get list successfully.")
    // });
    return (
      <div className="upload-form m-sm-30">
      {this.state.shouldOpenUploadImageDialog && (
        <UploadCropImageDialog
          handleClose={this.handleDialogClose}
          open={this.state.shouldOpenUploadImageDialog}
          handleOKEditClose={this.handleOKEditClose}
          item={this.state.item}
        />
      )}  
      {this.state.shouldOpenUploadDialog && (
        <UploadFormDialog
          handleClose={this.handleDialogClose}
          open={this.state.shouldOpenUploadDialog}
          handleOKEditClose={this.handleOKEditClose}
          item={this.state.item}
        />
      )}  
      {this.state.shouldOpenSingleFileUploadDialog && (
        <UploadSingleFileDialog
          handleClose={this.handleDialogClose}
          open={this.state.shouldOpenSingleFileUploadDialog}
          handleOKEditClose={this.handleOKEditClose}
          item={this.state.item}
        />
      )}              
       <div>
            <Button className="mb-16 mr-36 align-bottom" variant="contained" color="primary"
              onClick={() => this.setState({ shouldOpenUploadDialog: true })}>
              Open UploadForm
            </Button>  

            <Button className="mb-16 mr-36 align-bottom" variant="contained" color="primary"
              onClick={() => this.setState({ shouldOpenSingleFileUploadDialog: true })}>
              Open Upload Single File
            </Button>              
            <Button className="mb-16 mr-36 align-bottom" variant="contained" color="primary"
              onClick={() => this.setState({ shouldOpenUploadImageDialog: true })}>
              Open Upload Image
            </Button>                     
            <MaterialTable
              title='List'
              data={itemList}
              columns={columns}
              components={{
                Toolbar: props => (
                  <MTableToolbar {...props} />
                ),
              }}
              onSelectionChange={(rows) => {
                this.data = rows;
                // this.setState({selectedItems:rows});
              }}
              actions={[
                {
                  tooltip: 'Download',
                  icon: 'save',
                  onClick: (evt, data) => {
                    this.downloadFile(data);
                    //alert('You want to delete ' + data.length + ' rows');
                  }
                },
              ]}
            />
        </div>        
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: "Others", path: "/" }, { name: "Upload" }]}
          />
        </div>
        
  
        
      </div>
 
    );
  }
}

export default UploadForm;
