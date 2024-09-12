import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch,
  DialogTitle,
  DialogContent,
  DialogActions, Icon, IconButton
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getUserById, updateUser, addNewAdministrativeUnit,updateAdministrativeUnit, checkCode } from "./AdministrativeUnitService";
import { generateRandomId } from "utils";
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../styles/views/_loadding.scss';
import '../../../styles/views/_style.scss';

import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
toast.configure({
  autoClose: 1000,
  draggable: false,
  limit:3
});

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

class AdministrativeUnitEditorDialog extends Component {
  state = {
    name: "",
    code: "",
    level:0,
    isActive: false,
    loading:false
  };

  handleChange = (event, source) => {
    event.persist();
    if (source === "switch") {
      this.setState({ isActive: event.target.checked });
      return;
    }
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  openCircularProgress = () => {
    this.setState({ loading: true });
  };

  handleFormSubmit = async () => {
    await this.openCircularProgress();
    let { id, code } = this.state;
    let { t } = this.props;
    checkCode(id, code).then((result) => {
      //Nếu trả về true là code đã được sử dụng
      if (result.data) {
        console.log("Code đã được sử dụng");
        toast.warning(t('mess_code'));
        this.setState({loading:false})
      } else {
        if (id) {
          updateAdministrativeUnit({
            ...this.state
          }).then(() => {
            toast.success(t('mess_edit'));
            this.setState({loading:false})
          });
        } else {
          addNewAdministrativeUnit({
            ...this.state
          }).then((response) => {
            if(response.data != null && response.status == 200){
              this.state.id = response.data.id
              this.setState({...this.state, loading:false})
              toast.success(t('mess_add'));
            }
          });
        }
      }
    });
  };

  componentWillMount() {
    //getUserById(this.props.uid).then(data => this.setState({ ...data.data }));
    let { open, handleClose,item } = this.props;
    this.setState(item);
  }

  render() {
    let { open, handleClose, handleOKEditClose, t, i18n } = this.props;
    let {
      id,
      name,
      code,
      level,
      isActive,
      loading
    } = this.state;
    return (
      <Dialog open={open} PaperComponent={PaperComponent} maxWidth={'sm'} fullWidth={true}>
        <div className={clsx("wrapperButton", !loading && 'hidden')} >
          <CircularProgress className="buttonProgress" size={24} />
        </div>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        <span className="mb-20 styleColor" > {(id ? t("update") : t("Add")) + " " + t("AdministrativeUnit.title")} </span>
        <IconButton style={{ position: "absolute", right: "10px", top: "10px" }} onClick={() => handleClose()}><Icon color="error"
              title={t("close")}>
              close
            </Icon>
            </IconButton>
        </DialogTitle>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit} style={{
            overflowY: "auto",
            display: "flex",
            flexDirection: "column"
          }}>
          <DialogContent dividers>
          <Grid className="" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label={<span className="font">
                      <span style={{ color: "red" }}> *</span>
                      { t('AdministrativeUnit.code')}
                    </span>
                   }
                  onChange={this.handleChange}
                  type="text"
                  name="code"
                  value={code}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
                <TextValidator
                  className="w-100 mb-16"
                  label={ <span className="font">
                    <span style={{ color: "red" }}> *</span>
                    {t('AdministrativeUnit.name')}
                  </span>}
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                  variant="outlined"
                  size="small"
                />
                {/* <TextValidator
                  className="w-100 mb-16"
                  label="Level"
                  onChange={this.handleChange}
                  type="number"
                  name="level"
                  value={level}
                  validators={["required"]}
                  errorMessages={[t("general.errorMessages_required")]}
                /> */}
              </Grid>
              {/* <Grid>
                <FormControlLabel
                  className="my-20"
                  control={
                    <Switch
                      checked={isActive}
                      onChange={event => this.handleChange(event, "switch")}
                    />
                  }
                  label="Active Customer"
                />
              </Grid> */}
            </Grid>
 	        </DialogContent>
            

           <DialogActions spacing={4} className="flex flex-end flex-middle">
            <Button 
                variant="contained" 
                color="secondary" 
                onClick={() => this.props.handleClose()}>
                  {t('Cancel')}
              </Button>
              <Button 
                variant="contained"    
                color="primary" 
                type="submit">
                  {t('Save')}
              </Button>
            </DialogActions>
          </ValidatorForm>
      </Dialog>
    );
  }
}

export default AdministrativeUnitEditorDialog;
