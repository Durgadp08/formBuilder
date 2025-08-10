import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { createForm, saveForm } from "../store/formSlice";
import { saveFormToLocalStorage } from "../store/localstorage";
import useMyForm from "../hooks/useMyForm";
import { v4 as uuidv4 } from "uuid";

type Props = {
  open: boolean;
  handleClose: (arg0: boolean) => void;
};

const CreateFormDialog = ({ open, handleClose }: Props) => {
  const disptach = useDispatch<AppDispatch>();

  const { fields } = useMyForm();

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const handleCloseDialog = () => {
    handleClose(false);
  };

  const handleCancel = () => {
    handleClose(false);
  };

  const handleSaveForm = () => {
    if (!name.trim()) {
      setError(true);
      return;
    }
    saveFormToLocalStorage({
      id: uuidv4(),
      name,
      createdAt: new Date().toISOString(),
      fields,
    });
    disptach(createForm({ name }));
    setName("");
    disptach(saveForm());
    handleClose(false);
    alert("Form saved!");
  };

  return (
    <Dialog open={open} onClose={handleCloseDialog}>
      <DialogTitle>Form</DialogTitle>
      <DialogContent>
        <DialogContentText>Please enter the form name</DialogContentText>
        <TextField
          error={error}
          autoFocus
          required
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          margin="dense"
          name="name"
          label="Form Name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>cancel</Button>
        <Button onClick={handleSaveForm}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFormDialog;
