import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

import type { RootState } from "../store/store";
import {
  addOption,
  removeOption,
  updateField,
  updateFieldValidations,
} from "../store/formSlice";
import useMyForm from "../hooks/useMyForm";
import { useState, type ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import type { FieldOption } from "../store/form.types";
import React from "react";

const FormFieldsEditor = () => {
  const { selectedId } = useMyForm();
  const dispatch = useDispatch();

  const [newOptionLabel, setNewOptionLabel] = useState("");
  const [newOptionValue, setNewOptionValue] = useState("");

  const field = useSelector((state: RootState) =>
    state.fields.find((f) => f.id === selectedId)
  );

  if (!field) {
    return (
      <Typography sx={{ p: 2, opacity: 0.6 }}>
        Select a field to edit its properties
      </Typography>
    );
  }
  const handleChange = (key: string, value: any) => {
    dispatch(updateField({ ...field, [key]: value }));
  };

  // Handle nested validations
  const handleValidationChange = (key: string, value: any) => {
    dispatch(
      updateFieldValidations({
        id: field.id,
        validations: { ...field.validations, [key]: value },
      })
    );
  };

  const handleAddOption = () => {
    if (!newOptionLabel.trim() || !newOptionValue.trim()) return;
    const option: FieldOption = {
      id: uuidv4(),
      label: newOptionLabel.trim(),
      value: newOptionValue.trim(),
    };
    dispatch(addOption({ fieldId: field.id, option }));
    setNewOptionLabel("");
    setNewOptionValue("");
  };

  const handleRemoveOption = (optionId: string) => {
    dispatch(removeOption({ fieldId: field.id, optionId }));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Edit Field Properties
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Label */}
      <TextField
        fullWidth
        label="Label"
        value={field.label}
        onChange={(e) => handleChange("label", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Placeholder */}
      <TextField
        fullWidth
        label="Placeholder"
        value={field.placeholder || ""}
        onChange={(e) => handleChange("placeholder", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Description */}
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={2}
        value={field.description || ""}
        onChange={(e) => handleChange("description", e.target.value)}
        sx={{ mb: 2 }}
      />

      {/* Required checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={!!field.validations.required}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleValidationChange("required", e.target.checked)
            }
          />
        }
        label="Required"
      />

      <Divider sx={{ my: 2 }} />

      {/* Validations */}
      <Typography variant="subtitle1" gutterBottom>
        Validations
      </Typography>

      {field.type === "text" || field.type === "textarea" ? (
        <>
          <TextField
            fullWidth
            type="number"
            label="Min Length"
            value={field.validations.minLength ?? ""}
            onChange={(e) =>
              handleValidationChange(
                "minLength",
                Number(e.target.value) || undefined
              )
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Max Length"
            value={field.validations.maxLength ?? ""}
            onChange={(e) =>
              handleValidationChange(
                "maxLength",
                Number(e.target.value) || undefined
              )
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Pattern (Regex)"
            value={field.validations.pattern ?? ""}
            onChange={(e) => handleValidationChange("pattern", e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
      ) : null}

      {field.type === "number" || field.type === "date" ? (
        <>
          <TextField
            fullWidth
            type="number"
            label="Min Value"
            value={field.validations.minValue ?? ""}
            onChange={(e) =>
              handleValidationChange(
                "minValue",
                Number(e.target.value) || undefined
              )
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="number"
            label="Max Value"
            value={field.validations.maxValue ?? ""}
            onChange={(e) =>
              handleValidationChange(
                "maxValue",
                Number(e.target.value) || undefined
              )
            }
            sx={{ mb: 2 }}
          />
        </>
      ) : null}

      {(field.type === "select" ||
        field.type === "radio" ||
        field.type === "checkbox") && (
        <Box>
          <Typography variant="h6" gutterBottom>
            Options
          </Typography>

          {/* Add Option Form */}
          <Box display="flex" gap={1} mb={2}>
            <TextField
              label="Option Label"
              value={newOptionLabel}
              onChange={(e) => setNewOptionLabel(e.target.value)}
              size="small"
            />
            <TextField
              label="Option Value"
              value={newOptionValue}
              onChange={(e) => setNewOptionValue(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddOption}
            >
              Add
            </Button>
          </Box>

          {/* Options List */}
          <List dense>
            {field.options && field.options.length > 0 ? (
              field.options.map((opt) => (
                <React.Fragment key={opt.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton
                        edge="end"
                        onClick={() => handleRemoveOption(opt.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={opt.label} secondary={opt.value} />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))
            ) : (
              <Typography color="text.secondary">No options added</Typography>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default FormFieldsEditor;
