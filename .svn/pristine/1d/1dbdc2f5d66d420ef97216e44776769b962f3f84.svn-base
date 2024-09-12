import React, { Component,PureComponent } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

import { Fab, Icon, Card, Divider } from "@material-ui/core";
import ConstantList from "../../appConfig";
import axios from "axios";
import { Breadcrumb, SimpleCard, EgretProgressBar,RichTextEditor } from "egret";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import ReactDOM from 'react-dom';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import FileSaver from 'file-saver';
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
class UploadCropImageDialog extends Component {
  // state = {
  //   src: null,
  //   crop: {
  //     unit: '%',
  //     width: 30,
  //     aspect: 16 / 9,
  //   },
  // };

  state = {
    dragClass: "",
    files: [],
    statusList: [],    
    src: null,
    // crop: {
    //   x: 10,
    //   y: 10,
    //   width: 80,
    //   height: 80,
    // },
    crop: {
      unit: '%',
      width: 50,
      height: 50,
    },
    blobValue:null,    
    contentType:null
  }

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  // If you setState the crop in here you should return false.
  onImageLoaded = image => {
    this.imageRef = image;
  };

  onCropComplete = crop => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };
  download=()=> {
    FileSaver.saveAs(this.state.blobValue, 'Asset.jpg')
  };
  blob2file=(blobData)=>{
    const fd = new FormData();
    fd.set('a', blobData);
    return fd.get('a');
  }
  upload(){
    //var file = new File([byteArrays], filename, {type: contentType, lastModified: Date.now()});
    //var file = new File(this.state.blobValue, 'avatar.jpg', {type: "image/jpeg", lastModified: Date.now()})
    var file = this.blob2file(this.state.blobValue);
    this.fileUpload(file);
  }
  fileUploadBlob=()=>{
    //const url =ConstantList.API_ENPOINT+"/api/fileUpload/uploadfile";
    const url =ConstantList.API_ENPOINT+"/api/file/upload";
    let formData = new FormData();
    formData.set('uploadfile',this.state.blobValue)
    //formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }
    return  axios.post(url, formData,config)
  }  
  fileUpload(file){
    //const url =ConstantList.API_ENPOINT+"/api/fileUpload/uploadfile";
    const url =ConstantList.API_ENPOINT+"/api/file/upload";
    let formData = new FormData();
    formData.append('uploadfile',file);//Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
          }
    }
    return  axios.post(url, formData,config)
  }
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
  handleFileUploadOnSelect = e => {
    // let files = event.target.files;
    // this.fileUpload(files[0]).then(res => {
    //   let url =ConstantList.API_ENPOINT+"/public/file/downloadbyid/"+res.data.id;
    //   alert(url);
    //   this.setState({imageUrl:url})
    //   console.log(url);
    //   //alert("File uploaded successfully.")
    // });
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }    
  }
  handleDragOver = event => {
    event.preventDefault();
    this.setState({ dragClass: "drag-shadow" });
  };

  handleDrop = event => {
    event.preventDefault();
    event.persist();
    let files = event.dataTransfer.files;
    // this.fileUpload(files[0]).then(res => {
    //   let url =ConstantList.API_ENPOINT+"/public/file/downloadbyid/"+res.data.id;
    //   alert(url);
    //   this.setState({imageUrl:url})
    //   console.log(url);
    //   //alert("File uploaded successfully.")
    // });
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
  render() {
    let { open, handleClose, handleOKEditClose} = this.props;
    const { crop, croppedImageUrl, src } = this.state;
    let { dragClass, files, queProgress,itemList } = this.state;
    let isEmpty = files.length === 0;
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth="false">
        <div style={{height: 400, width:400}}>
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            <span className="mb-20">Save</span>
          </DialogTitle>
          <DialogContent>
            <div>
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
                <div className={`${dragClass} upload-drop-box mb-24 flex flex-center flex-middle`}
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
                <div>
                  <input type="file" accept="image/*" onChange={this.onSelectFile} />
                </div>            
                  <div>
                      {this.state.src && (
                        <ReactCrop style={{maxWidth:'80%'}}
                          src={this.state.src}
                          crop={this.state.crop}
                          onImageLoaded={this.onImageLoaded}
                          onComplete={this.onCropComplete}
                          onChange={this.onCropChange}
                        />
                      )}            
                  </div>
              </div>
            <div>
              {croppedImageUrl && (
                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
              )}
            </div>
            <div className="flex flex-space-between flex-middle">
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button variant="contained" color="secondary" onClick={() => this.props.handleClose()}>Cancel</Button>
                <Button onClick={()=>this.download()}>
                  Download cropped image
                </Button>
                
                <Button onClick={()=>this.fileUploadBlob()}>
                  Upload cropped image
                </Button>                       
                         
            </div> 
          </DialogContent> 
          </div>                 
     </Dialog>
    
    );
  }
}

export default UploadCropImageDialog;
