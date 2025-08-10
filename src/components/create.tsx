import { Box, Button, Grid as Grid, Typography } from "@mui/material";
import FormButtonsSideBar from "./createFormButtons";
import FormViewer from "./formViewer";
import FormFieldsEditor from "./formlabelseditor";
import { useEffect, useState } from "react";
import CreateFormDialog from "./createFormDialog";
import useMyForm from "../hooks/useMyForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllForms } from "../store/localstorage";
import { clearFields } from "../store/formSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";

const Create = () => {
  const [open, setOpen] = useState(false);
  const { fields, isSaved } = useMyForm();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "You are going to lose all unsaved data. Continue?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handleBeforeRoute = (event: any) => {
      if (fields.length > 0) {
        const confirmLeave = window.confirm(
          "You are going to lose all unsaved data. Continue?"
        );
        if (!confirmLeave) {
          event.preventDefault();
        } else {
          dispatch(clearFields());
        }
      }
    };

    window.addEventListener("popstate", handleBeforeRoute);
    return () => {
      window.removeEventListener("popstate", handleBeforeRoute);
    };
  }, [fields, dispatch]);

  const handleSave = () => {
    if (fields.length == 0) {
      toast.error("Add atleast one field");
      return;
    }
    setOpen(true);
  };

  const handlePreview = () => {
    if (fields.length == 0) {
      toast.error("Add atleast one field to preview");
      return;
    }
    if (!isSaved) {
      toast.error("First save the form to preview");
      return;
    }
    const forms = getAllForms();
    const lastSavedForm = forms[forms.length - 1];
    if (!lastSavedForm) {
      toast.error("Please save the form before previewing");
      return;
    }
    navigate(`/preview?id=${lastSavedForm.id}`);
  };
  return (
    <>
      <CreateFormDialog open={open} handleClose={setOpen} />
      <Grid
        container
        sx={{
          width: "99vw",
          height: "90vh",
          py: 2,
        }}
        spacing={2}
      >
        <Grid
          size={3}
          sx={{
            borderRight: "1px solid #ccc",
            overflowY: "auto",
          }}
        >
          <FormButtonsSideBar />
        </Grid>

        <Grid
          size={6}
          sx={{
            py: 2,
            borderRight: "1px solid #ccc",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Box display="flex" justifyContent="space-between">
            <Typography>Form</Typography>
            <Box display="flex" gap={1}>
              <Button>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
              <Button onClick={handlePreview}>Preview</Button>
            </Box>
          </Box>
          <FormViewer />
        </Grid>

        <Grid
          size={3}
          sx={{
            overflowY: "auto",
          }}
        >
          <FormFieldsEditor />
        </Grid>
      </Grid>
    </>
  );
};

export default Create;
