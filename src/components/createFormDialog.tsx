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
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../store/store";
import { createForm } from "../store/formSlice";

const CreateFormDialog = () => {
  const navigate = useNavigate();
  const disptach = useDispatch<AppDispatch>();

  const [open, setOpen] = useState(true);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const handleCloseDialog = () => {
    navigate("/");
    setOpen(false);
  };
  const handleCancel = () => {
    navigate("/");
  };

  const handleCreate = () => {
    if (name.length == 0) setError(true);
    else {
      disptach(createForm({ name }));
      setOpen(false);
    }
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
        <Button onClick={handleCreate}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFormDialog;
