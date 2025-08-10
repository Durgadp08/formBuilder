import {
  Container,
  TextField,
  Box,
  Typography,
  Grid,
  FormControl,
  FormLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import TocIcon from "@mui/icons-material/Toc";
import useMyForm from "../hooks/useMyForm";
import type { FormField } from "../store/form.types";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { removeField, updateSelectedId } from "../store/formSlice";

const FormViewer = () => {
  const { fields } = useMyForm();

  const dispacth = useDispatch<AppDispatch>();

  const handleDeleteField = (id: string) => {
    dispacth(removeField(id));
  };

  const handleSelectedId = (id: string) => {
    dispacth(updateSelectedId(id));
  };

  const renderBox = ({ id, type, label, description, options }: FormField) => {
    return (
      <Box
        sx={{
          border: "1px solid grey",
          p: 2,
          borderRadius: "20px",
          cursor: "pointer",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={12}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography>{!label ? "Label for field" : label}</Typography>
              <Box display="flex" gap={1}>
                <DeleteIcon
                  onClick={() => {
                    handleDeleteField(id);
                  }}
                />
                <TocIcon />
              </Box>
            </Box>
          </Grid>

          <Grid size={12}>
            <Typography>
              {!description ? "Some Description" : description}
            </Typography>
          </Grid>
        </Grid>

        {type === "text" && (
          <TextField
            disabled
            fullWidth
            placeholder={description}
            label={label}
          />
        )}

        {type === "number" && (
          <TextField
            disabled
            fullWidth
            type="number"
            placeholder={description}
            label={label}
          />
        )}

        {type === "textarea" && (
          <TextField
            disabled
            fullWidth
            multiline
            rows={4}
            placeholder={description}
            label={label}
          />
        )}

        {type === "select" && (
          <TextField disabled select fullWidth label={label} value="">
            {options?.map((opt, idx) => (
              <MenuItem key={idx} value={opt.value}>
                {opt.value}
              </MenuItem>
            ))}
          </TextField>
        )}

        {type === "radio" && (
          <FormControl disabled component="fieldset" fullWidth>
            <FormLabel>{label}</FormLabel>
            <RadioGroup>
              {options?.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  value={opt}
                  control={<Radio />}
                  label={opt.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )}

        {type === "checkbox" && (
          <FormControl disabled component="fieldset" fullWidth>
            <FormLabel>{label}</FormLabel>
            <Box>
              {options?.map((opt, idx) => (
                <FormControlLabel
                  key={idx}
                  control={<Checkbox />}
                  label={opt.label}
                />
              ))}
            </Box>
          </FormControl>
        )}

        {type === "date" && (
          <TextField
            disabled
            fullWidth
            type="date"
            label={label}
            InputLabelProps={{ shrink: true }}
          />
        )}
      </Box>
    );
  };

  return (
    <Container
      maxWidth="sm"
      key={1}
      sx={{
        border: "2px solid grey",
        p: 2,
        borderRadius: "20px",
        backgroundColor: "#F8F8F9",
      }}
    >
      {fields.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            opacity: 0.5,
            textAlign: "center",
            p: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Add some fields to view
          </Typography>
        </Box>
      ) : (
        fields.map((field: FormField) => {
          return (
            <>
              <Box
                key={field.id}
                mb={2}
                sx={{ backgroundColor: "#fff" }}
                onClick={() => {
                  handleSelectedId(field.id);
                }}
              >
                {renderBox(field)}
              </Box>
            </>
          );
        })
      )}
    </Container>
  );
};

export default FormViewer;
