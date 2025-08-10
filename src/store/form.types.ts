export type FieldType =
  | "text"
  | "date"
  | "textarea"
  | "number"
  | "radio"
  | "select"
  | "checkbox";

export interface FieldOption {
  id: string;
  label: string;
  value: string;
}

export interface FieldValidations {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
  pattern?: string;
}

export type FormField = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  value?: string;
  description?: string;
  required?: boolean;
  validations: FieldValidations;
  options?: FieldOption[];
};

export type Form = {
  isSaved: boolean;
  name: string;
  fields: FormField[];
  selectedId: string;
};

export type FormState = {
  fields: FormField[];
};
