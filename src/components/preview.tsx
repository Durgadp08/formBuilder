import { useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { useEffect, useState } from "react";
import { getFormById } from "../store/localstorage";
import type { FormField } from "../store/form.types";

const FormPreview = () => {
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("id");
  const [fields, setFields] = useState<FormField[]>([]);
  const [name, setName] = useState("");

  console.log(fields);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!formId) return;
    const savedForms = getFormById(formId);
    if (savedForms) {
      setName(savedForms.name);
      setFields(savedForms.fields);
    }
  }, [formId]);

  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    alert("Form submitted successfully!");
  };

  if (!fields.length) {
    return (
      <Typography variant="body1" color="text.secondary">
        No fields to preview.
      </Typography>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "500px",
        p: 3,
        border: "1px solid grey",
        borderRadius: "10px",
        backgroundColor: "#fff",
        justifyContent: "center",
      }}
    >
      <Typography >{name}</Typography>
      {fields.map((field) => (
        <Box key={field.id}>
          {/* TEXT / NUMBER / DATE / TEXTAREA */}
          {(field.type === "text" ||
            field.type === "number" ||
            field.type === "date" ||
            field.type === "textarea") && (
            <Controller
              name={field.id}
              control={control}
              rules={{
                required: field.validations?.required
                  ? `${field.label} is required`
                  : false,
                minLength: field.validations?.minLength
                  ? {
                      value: field.validations.minLength,
                      message: `Minimum length is ${field.validations.minLength}`,
                    }
                  : undefined,
                maxLength: field.validations?.maxLength
                  ? {
                      value: field.validations.maxLength,
                      message: `Maximum length is ${field.validations.maxLength}`,
                    }
                  : undefined,
              }}
              render={({ field: rhfField }) => (
                <TextField
                  {...rhfField}
                  fullWidth
                  type={field.type === "number" ? "number" : field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  multiline={field.type === "textarea"}
                  rows={field.type === "textarea" ? 4 : undefined}
                  error={!!errors[field.id]}
                  helperText={errors[field.id]?.message as string}
                />
              )}
            />
          )}

          {/* SELECT */}
          {field.type === "select" && (
            <Controller
              name={field.id}
              control={control}
              rules={{
                required: field.validations?.required
                  ? `${field.label} is required`
                  : false,
              }}
              render={({ field: rhfField }) => (
                <FormControl fullWidth error={!!errors[field.id]}>
                  <FormLabel>{field.label}</FormLabel>
                  <Select {...rhfField} displayEmpty>
                    <MenuItem value="">Select an option</MenuItem>
                    {field.options?.map((opt) => (
                      <MenuItem key={opt.id} value={opt.value}>
                        {opt.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors[field.id] && (
                    <FormHelperText>
                      {errors[field.id]?.message as string}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          )}

          {/* RADIO */}
          {field.type === "radio" && (
            <Controller
              name={field.id}
              control={control}
              rules={{
                required: field.validations?.required
                  ? `${field.label} is required`
                  : false,
              }}
              render={({ field: rhfField }) => (
                <FormControl error={!!errors[field.id]}>
                  <FormLabel>{field.label}</FormLabel>
                  <RadioGroup {...rhfField}>
                    {field.options?.map((opt) => (
                      <FormControlLabel
                        key={opt.id}
                        value={opt.value}
                        control={<Radio />}
                        label={opt.label}
                      />
                    ))}
                  </RadioGroup>
                  {errors[field.id] && (
                    <FormHelperText>
                      {errors[field.id]?.message as string}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          )}

          {/* CHECKBOX */}
          {field.type === "checkbox" && (
            <Controller
              name={field.id}
              control={control}
              rules={{
                required: field.validations?.required
                  ? `Please select at least one ${field.label}`
                  : false,
              }}
              render={({ field: rhfField }) => (
                <FormControl error={!!errors[field.id]}>
                  <FormLabel>{field.label}</FormLabel>
                  {field.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.id}
                      control={
                        <Checkbox
                          checked={rhfField.value?.includes(opt.value) || false}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            let newValue = rhfField.value || [];
                            if (checked) {
                              newValue = [...newValue, opt.value];
                            } else {
                              newValue = newValue.filter(
                                (v: string) => v !== opt.value
                              );
                            }
                            rhfField.onChange(newValue);
                          }}
                        />
                      }
                      label={opt.label}
                    />
                  ))}
                  {errors[field.id] && (
                    <FormHelperText>
                      {errors[field.id]?.message as string}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          )}
        </Box>
      ))}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default FormPreview;
