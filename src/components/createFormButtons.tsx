import { Box, Button, Grid } from "@mui/material";
import type { FieldType } from "../store/form.types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { addField } from "../store/formSlice";

const FormButtonsSideBar = () => {
  const disptach = useDispatch<AppDispatch>();
  const handleAddField = (type: FieldType) => {
    disptach(addField({ type }));
  };
  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ backgroundColor: "#F8F8F9" ,p:1 }}
    >
      <Grid size={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={() => handleAddField("text")}>
            Add Text
          </Button>
          <Button variant="contained" onClick={() => handleAddField("number")}>
            Add Number
          </Button>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={() => handleAddField("textarea")}
          >
            Add Textarea
          </Button>
          <Button variant="contained" onClick={() => handleAddField("select")}>
            Add Select
          </Button>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={() => handleAddField("radio")}>
            Add Radio
          </Button>
          <Button
            variant="contained"
            onClick={() => handleAddField("checkbox")}
          >
            Add Checkbox
          </Button>
        </Box>
      </Grid>

      <Grid size={12}>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={() => handleAddField("date")}>
            Add Date
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FormButtonsSideBar;
