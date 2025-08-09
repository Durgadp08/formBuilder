import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FieldType, Form } from "./form.types";

const initialState: Form = {
  name: "",
  fields: [],
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
        id: Date.now(),
        type: action.payload.type,
        label: action.payload.label ?? "",
        value: "",
        placeholder: "",
        required: false,
        description: "",
      });
    },
    removeField: (state, action: PayloadAction<number>) => {
      state.fields = state.fields.filter((field) => field.id != action.payload);
    },
    updateFieldValue: (
      state,
      action: PayloadAction<{ id: number; value: string }>
    ) => {
      const field = state.fields.find(
        (field) => field.id === action.payload.id
      );
      if (field) field.value = action.payload.value;
    },
    updateFieldLabel: (
      state,
      action: PayloadAction<{ id: number; label: string }>
    ) => {
      const field = state.fields.find(
        (field) => field.id === action.payload.id
      );
      if (field) field.label = action.payload.label;
    },
    updateRequired: (
      state,
      action: PayloadAction<{ id: number; required: boolean }>
    ) => {
      const field = state.fields.find(
        (field) => field.id === action.payload.id
      );
      if (field) field.required = action.payload.required;
    },
  },
});

export const {
  createForm,
  addField,
  updateFieldLabel,
  removeField,
  updateFieldValue,
  updateRequired,
} = formState.actions;

export default formState.reducer;
