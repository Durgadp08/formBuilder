import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  FieldOption,
  FieldType,
  FieldValidations,
  Form,
  FormField,
} from "./form.types";
import { v4 as uuidv4 } from "uuid";

const initialState: Form = {
  name: "",
  fields: [],
  selectedId: "",
  isSaved: false,
};

const formState = createSlice({
  name: "form",
  initialState,
  reducers: {
    createForm: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
    },

    addField: (
      state,
      action: PayloadAction<{ type: FieldType; label?: string }>
    ) => {
      state.fields.push({
        id: uuidv4(),
        type: action.payload.type,
        label: action.payload.label ?? "",
        value: "",
        placeholder: "",
        description: "",
        validations: {},
      });
    },
    saveForm: (state) => {
      state.isSaved = true;
    },

    updateSelectedId: (state, action: PayloadAction<string>) => {
      state.selectedId = action.payload;
    },

    removeField: (state, action: PayloadAction<string>) => {
      state.fields = state.fields.filter((field) => field.id != action.payload);
    },

    clearFields: (state) => {
      state.fields = [];
    },

    updateFieldValidations: (
      state,
      action: PayloadAction<{ id: string; validations: FieldValidations }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.id);
      if (field) {
        field.validations = {
          ...field.validations,
          ...action.payload.validations,
        };
      }
    },

    updateField: (state, action: PayloadAction<FormField>) => {
      const index = state.fields.findIndex((f) => f.id === action.payload.id);
      if (index !== -1) {
        state.fields[index] = action.payload;
      }
    },

    addOption: (
      state,
      action: PayloadAction<{ fieldId: string; option: FieldOption }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field) {
        if (!field.options) field.options = [];
        field.options.push(action.payload.option);
      }
    },
    removeOption: (
      state,
      action: PayloadAction<{ fieldId: string; optionId: string }>
    ) => {
      const field = state.fields.find((f) => f.id === action.payload.fieldId);
      if (field && field.options) {
        field.options = field.options.filter(
          (o) => o.id !== action.payload.optionId
        );
      }
    },
  },
});

export const {
  createForm,
  addField,
  removeField,
  updateSelectedId,
  updateField,
  clearFields,
  removeOption,
  addOption,
  saveForm,
  updateFieldValidations,
} = formState.actions;

export default formState.reducer;
