import React, { Component } from 'react'
import { Breadcrumb, SimpleCard, EgretProgressBar } from 'egret'
import { Fab, Icon, Card, Grid, Divider, Button } from '@material-ui/core'
import axios from 'axios'
import ConstantList from '../../appConfig'
class UploadImage extends Component {
  state = {
    dragClass: '',
    files: [],
    statusList: [],
    queProgress: 0,
    file: null,
    imagePreviewUrl: '',
    imageArray: [],
    id: "upload-photo",
    imageArray: [] /* Replace imageURI with an array for multiple images */

  }
  handleFileUploadOnSelect = (event) => {
    let files = event.target.files
    this.fileUpload(files[0]).then((res) => {
      alert('File uploaded successfully.')
    })
  }
  handleFileSelect = (event) => {
    event.preventDefault();
    const { t } = this.props;
    let { handleImageSelect } = this.props;
    let files = event.target.files;
    let file = files[0];
    let list = [];
    if (
      file.type !== "image/jpg" &&
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
    } else {
      if (file.size >= 2097152) {
      } else {
        for (const iterator of files) {
          list.push({
            file: iterator,
            uploading: false,
            error: false,
            progress: 0,
          });
        }
        handleImageSelect(files);
        this.setState({
          files: [...list],
        });
      }
    }
  }

  handleDragOver = (event) => {
    event.preventDefault()
    this.setState({ dragClass: '' })
  }

  handleDrop = (event) => {
    event.preventDefault()
    event.persist()
    const { handleImageSelect } = this.props
    const files = event.dataTransfer.files
    const file = files[0]
    const imageRegExp = new RegExp('image/*')
    if (imageRegExp.test(file.type)) {
      handleImageSelect(file)
      this.setState({
        file,
        dragClass: '',
        files: [{ file }],
      })
    } else {
      alert('Incorrect file type')
      this.setState({ dragClass: 'drag-shadow' })
    }
  }

  handleDragStart = (event) => {
    this.setState({ dragClass: 'drag-shadow' })
  }

  handleSingleRemove = (index) => {
    let files = [...this.state.files]
    files.splice(index, 1)
    this.setState({
      files: [...files],
    })
    this.props.handleImageRemove()
  }

  handleAllRemove = () => {
    this.setState({ files: [] })
  }
  fileUpload(file) {
    const url = ConstantList.API_ENPOINT + '/api/file/upload'
    let formData = new FormData()
    formData.append('uploadfile', file) //Lưu ý tên 'uploadfile' phải trùng với tham số bên Server side
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
    return axios.post(url, formData, config)
  }

  uploadSingleFile = (index) => {
    let allFiles = [...this.state.files]
    let file = this.state.files[index]
    this.fileUpload(file.file).then((res) => {
      alert('File uploaded successfully.')
    })

    allFiles[index] = { ...file, uploading: true, error: false }

    this.setState({
      files: [...allFiles],
    })
  }

  uploadAllFile = () => {
    let allFiles = []

    this.state.files.map((item) => {
      allFiles.push({
        ...item,
        uploading: true,
        error: false,
      })

      return item
    })

    this.setState({
      files: [...allFiles],
      queProgress: 35,
    })
  }

  handleSingleCancel = (index) => {
    let allFiles = [...this.state.files]
    let file = this.state.files[index]

    allFiles[index] = { ...file, uploading: false, error: true }

    this.setState({
      files: [...allFiles],
    })
  }

  handleCancelAll = () => {
    let allFiles = []

    this.state.files.map((item) => {
      allFiles.push({
        ...item,
        uploading: false,
        error: true,
      })

      return item
    })

    this.setState({
      files: [...allFiles],
      queProgress: 0,
    })
  }


  readURI = (e) => {
    if (e.target.files) {
      // let filess = e.target.files;
      // let list = []; 
      // for (const iterator of filess) { 
      //   // if (iterator.type.split("/").length <= 0 || acceptType.indexOf(iterator.type.split("/")[1]) < 0) {
      //   //   console.log(acceptType);
      //   //   console.log(iterator.type.split("/"));
      //   //   alert(t("general.type_not_accepted"));
      //   //   break;
      //   // }
      //   list.push({
      //     file: iterator,
      //     uploading: false,
      //     error: false,
      //     progress: 0
      //   });
      // }

      // this.setState({
      //   files: [...list] 
      // },()=>{
      //   this.props.handleImageSelect(list)
      // });
      /* Get files in array form */
      let files = Array.from(e.target.files);
      this.props.handleImageSelect(e.target.files)

      /* Map each file to a promise that resolves to an array of image URI's */
      Promise.all(files.map(file => {
        return (new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.addEventListener('load', (ev) => {
            resolve(ev.target.result);
          });
          reader.addEventListener('error', reject);
          reader.readAsDataURL(file);
        }));
      }))
        .then(images => {

          /* Once all promises are resolved, update state with image URI array */
          this.setState({ imageArray: images })

        }, error => {
          console.error(error);
        });
    }
  }

  render() {
    let { dragClass, files, queProgress, imageArray } = this.state
    let { mainImageUrl, t } = this.props
    let fileName =
      mainImageUrl !== null && mainImageUrl !== ''
        ? mainImageUrl.split('/').pop()
        : ''
    let isEmpty = files.length === 0

    //Image preview
    let { imagePreviewUrl } = this.props
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (
        <img src={imagePreviewUrl} alt="Product" style={{ maxWidth: 300, maxHeight: 180 }} />

      )
    }

    return (
      <SimpleCard  className="w-50" style={{ maxWidth: '100' }}>
        <div className="flex flex-center flex-middle">

          <Grid
            container
            spacing={2}
            justify="center"
            alignItems="center"
            direction="row"
          >
            {imagePreviewUrl?.length > 0 ?


              imagePreviewUrl.map(imageURI => (
                <>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <img className="photo-uploaded" src={imageURI.url} alt="Ảnh tải lên" />
                  </Grid>

                </>
              ))
              :
              this.state.imageArray?.map(imageURI => (
                <>
                  <Grid item lg={4} md={4} sm={12} xs={12}>
                    <img className="photo-uploaded" src={imageURI} alt="Ảnh tải lên" />
                  </Grid>

                </>
              ))
            }
          </Grid>

        </div>


        <Card className="mt-16 mb-16" elevation={2}>
          <div
            className="flex flex-wrap mb-16"
            style={{ display: 'inline-block' }}
          >
            <label htmlFor="upload-multiple-file">
              <Fab
                className="capitalize"
                color="primary"
                component="span"
                variant="extended"
              >
                <div className="flex flex-middle">
                  <Icon className="pr-8">cloud_upload</Icon>
                  <span>Chọn danh sách ảnh</span>
                </div>
              </Fab>
            </label>
            <input
              className="display-none"
              onChange={this.readURI}
              id="upload-multiple-file"
              type="file"
              accept="image/*"
              multiple
            />
          </div>
          {/* <span style={{ marginLeft: '20px' }}>
            {this.state.imageArray.length}
          </span> */}
        </Card>
      </SimpleCard>
    )
  }
}

export default UploadImage
