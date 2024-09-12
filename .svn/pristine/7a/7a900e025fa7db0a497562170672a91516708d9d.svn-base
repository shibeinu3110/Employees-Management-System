import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { Fab, Icon, Card, Divider } from "@material-ui/core";
import ConstantList from "../../appConfig";
import axios from "axios";
import { Breadcrumb, SimpleCard, EgretProgressBar,RichTextEditor } from "egret";

class UploadSingleFileDialog extends Component {
  state = {
    dragClass: "",
    files: [],
    statusList: [],
    queProgress: 0,
    itemList: [],
    shouldOpenUploadDialog: false,
    imageUrl:"",
  };
  handleFileUploadOnSelect = event => {
    let files = event.target.files;
    this.fileUpload(files[0]).then(res => {
      let url =ConstantList.API_ENPOINT+"/public/file/downloadbyid/"+res.data.id;
      alert(url);
      this.setState({imageUrl:url})
      // console.log(url);
      //alert("File uploaded successfully.")
    });
  }
  handleFileSelect = event => {
    let files = event.target.files;
    let list = [];

    for (const iterator of files) {
      list.push({
        file: iterator,
        uploading: false,
        error: false,
        progress: 0
      });
    }

    this.setState({
      files: [...list]
    });
  };

  handleDragOver = event => {
    event.preventDefault();
    this.setState({ dragClass: "drag-shadow" });
  };

  handleDrop = event => {
    event.preventDefault();
    event.persist();

    let files = event.dataTransfer.files;
    this.fileUpload(files[0]).then(res => {
      let url =ConstantList.API_ENPOINT+"/public/file/downloadbyid/"+res.data.id;
      alert(url);
      this.setState({imageUrl:url})
      // console.log(url);
      //alert("File uploaded successfully.")
    });
    return false;
  };

  handleDragStart = event => {
    this.setState({ dragClass: "drag-shadow" });
  };


  fileUpload(file){
    //const url =ConstantList.API_ENPOINT+"/api/fileUpload/uploadfile";
    const url =ConstantList.API_ENPOINT+"/api/file/uploadfile";
    let formData = new FormData();
    formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }
    return  axios.post(url, formData,config)
  }

  render() {
    let { open, handleClose, handleOKEditClose} = this.props;
    let { dragClass, files, queProgress,itemList } = this.state;
    let isEmpty = files.length === 0;
    return (
      <Dialog  open={open}>
      <SimpleCard title="File Upload"  className="mb-40">
          <div className="flex flex-wrap mb-36">
            <label htmlFor="upload-single-file-on-select">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex flex-middle">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Upload File On Select</span>
                </div>
              </Fab>
            </label>            
            <input
              className="display-none"
              onChange={this.handleFileUploadOnSelect}
              id="upload-single-file-on-select"
              type="file"
            />      
          </div>      
          <div
            className={`${dragClass} upload-drop-box mb-24 flex flex-center flex-middle`}
            onDragEnter={this.handleDragStart}
            onDragOver={this.handleDragOver}
            onDrop={this.handleDrop}
          >
            {isEmpty ? (
              <span>Drop your files here</span>
            ) : (
              <h5 className="m-0">
                {files.length} file{files.length > 1 ? "s" : ""} selected...
              </h5>
            )}
          </div>
          <div>
            <img src={this.state.imageUrl} alt="Italian Trulli"/>
          </div>
        </SimpleCard>        
        <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button variant="contained" color="secondary" onClick={() => this.props.handleClose()}>Cancel</Button>
      </div>    
     </Dialog>
    );
  }
}

export default UploadSingleFileDialog;
