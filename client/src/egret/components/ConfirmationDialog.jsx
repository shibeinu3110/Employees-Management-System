import React from "react";
import { Dialog, Button, DialogActions} from "@material-ui/core";

const ConfirmationDialog = ({
  open,
  onConfirmDialogClose,
  text,
  title = "confirm",
  onYesClick,
  Yes,
  No
}) => {
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
    >
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">{title}</h4>
        <p>{text}</p>
        <DialogActions>
          <div className="flex flex-space-between flex-middle">
            {No && (<Button onClick={onConfirmDialogClose} variant="contained" color="secondary">
              {No}
            </Button>)}
            <Button onClick={onYesClick} className={"ml-16"} variant="contained" color="primary">
              {Yes}
            </Button>
          </div>
          </DialogActions>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
