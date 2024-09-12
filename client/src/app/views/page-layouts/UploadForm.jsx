import React, { Component } from "react";
import { Breadcrumb, SimpleCard, EgretProgressBar } from "egret";
import { Fab, Icon, Card, Grid, Divider, Button } from "@material-ui/core";
import axios from "axios";
import ConstantList from "../../appConfig";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FileSaver from 'file-saver';

class UploadForm extends Component {
  state = {
    dragClass: "",
    files: [],
    statusList: [],
    queProgress: 0
  };
  handleFileUploadOnSelect = e => {
    // let files = event.target.files;
    // this.fileUpload(files[0]).then(res => {
    //   alert("File uploaded successfully.")
    // });
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }     
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
    // let list = [];

    // for (const iterator of files) {
    //   list.push({
    //     file: iterator,
    //     uploading: false,
    //     error: false,
    //     progress: 0
    //   });
    // }

    // this.setState({
    //   dragClass: "",
    //   files: [...list]
    // });
    alert('Drop');
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(files[0]);
    }     
    return false;
  };

  handleDragStart = event => {
    this.setState({ dragClass: "drag-shadow" });
  };

  handleSingleRemove = index => {
    let files = [...this.state.files];
    files.splice(index, 1);
    this.setState({
      files: [...files]
    });
  };

  handleAllRemove = () => {
    this.setState({ files: [] });
  };
  fileUpload(file){
    const url =ConstantList.API_ENPOINT+"/api/fileUpload/importAsset";
    let formData = new FormData();
    formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }
    return  axios.post(url, formData,config)
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
  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.setState({blobValue:blob});
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }
  render() {
    let { dragClass, files, queProgress } = this.state;
    const { crop, croppedImageUrl, src } = this.state;
    let isEmpty = files.length === 0;

    return (
      <div className="upload-form m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb
            routeSegments={[{ name: "Others", path: "/" }, { name: "Upload" }]}
          />
        </div>
        <SimpleCard title="File Upload">
          <div className="flex flex-wrap mb-24">
            <label htmlFor="upload-single-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex flex-middle">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Single File</span>
                </div>
              </Fab>
            </label>
            <input
              className="display-none"
              onChange={this.handleFileSelect}
              id="upload-single-file"
              type="file"
            />
            <div className="px-16"></div>
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
            <div className="px-16"></div>
            <label htmlFor="upload-multiple-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex flex-middle">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Multiple File</span>
                </div>
              </Fab>
            </label>
            <input
              className="display-none"
              onChange={this.handleFileSelect}
              id="upload-multiple-file"
              type="file"
              multiple
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
              {croppedImageUrl && (
                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
              )}
          </div>
          <Card className="mb-24" elevation={2}>
            <div className="p-16">
              <Grid
                container
                spacing={2}
                justify="center"
                alignItems="center"
                direction="row"
              >
                <Grid item lg={4} md={4}>
                  Name
                </Grid>
                <Grid item lg={1} md={1}>
                  Size
                </Grid>
                <Grid item lg={2} md={2}>
                  Progress
                </Grid>
                <Grid item lg={1} md={1}>
                  Status
                </Grid>
                <Grid item lg={4} md={4}>
                  Actions
                </Grid>
              </Grid>
            </div>
            <Divider></Divider>

            {isEmpty && <p className="px-16">Que is empty</p>}

            {files.map((item, index) => {
              let { file, uploading, error, progress } = item;
              return (
                <div className="px-16 py-16" key={file.name}>
                  <Grid
                    container
                    spacing={2}
                    justify="center"
                    alignItems="center"
                    direction="row"
                  >
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      {file.name}
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <EgretProgressBar value={progress}></EgretProgressBar>
                    </Grid>
                    <Grid item lg={1} md={1} sm={12} xs={12}>
                      {error && <Icon color="error">error</Icon>}
                      {/* {uploading && <Icon className="text-green">done</Icon>} */}
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                      <div className="flex">
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={uploading}
                          onClick={() => this.uploadSingleFile(index)}
                        >
                          Upload
                        </Button>
                        <Button
                          className="mx-8"
                          variant="contained"
                          disabled={!uploading}
                          color="secondary"
                          onClick={() => this.handleSingleCancel(index)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          className="bg-error"
                          onClick={() => this.handleSingleRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </Card>

          <div>
            <p className="m-0">Queue progress:</p>
            <div className="py-16">
              <EgretProgressBar value={queProgress}></EgretProgressBar>
            </div>
            <div className="flex">
              <Button
                variant="contained"
                color="primary"
                disabled={isEmpty}
                onClick={this.uploadAllFile}
              >
                Upload All
              </Button>
              <Button
                className="mx-8"
                variant="contained"
                color="secondary"
                disabled={isEmpty}
                onClick={this.handleCancelAll}
              >
                Cancel All
              </Button>
              {!isEmpty && (
                <Button
                  variant="contained"
                  className="bg-error"
                  onClick={this.handleAllRemove}
                >
                  Remove All
                </Button>
              )}
            </div>
          </div>
        </SimpleCard>
      </div>
    );
  }
}

export default UploadForm;
