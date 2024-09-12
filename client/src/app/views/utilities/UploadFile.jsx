import React, { Component } from 'react'
import {DropzoneDialog} from 'material-ui-dropzone'
import Button from '@material-ui/core/Button';
 
export default class DropzoneDialogExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            files: []
        };
    }
 
    handleClose() {
        this.setState({
            open: false
        });
    }
 
    handleAddFile(file) {
        //Saving files to state for further use and closing Modal.
        // debugger;
        // console.log(file);
    }
 
    handleSave(files) {
        //Saving files to state for further use and closing Modal.
        this.setState({
            files: files,
            open: false
        });
    }
 
    handleOpen() {
        this.setState({
            open: true,
        });
    }
 
    render() {
        return (
            <div>
                <Button onClick={this.handleOpen.bind(this)}>
                  Add file
                </Button>
                <DropzoneDialog
                    open={this.state.open}
                    onAdd={this.handleAddFile}
                    onSave={this.handleSave.bind(this)}
                    // acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    acceptedFiles={['application/msword', 'application/vnd.ms-excel', 'application/vnd.ms-powerpoint', 'text/plain', 'application/pdf', 'image/*']}
                    showPreviews={true}
                    showFileNames
                    filesLimit={2}
                    maxFileSize={5000000}
                    onClose={this.handleClose.bind(this)}
                />
            </div>
        );
    }
}