export type FieldType =
  | "text"
  | "date"
  | "textarea"
  | "number"
  | "date"
  | "radio"
  | "select"
  | "checkbox";

export type FormField = {
  id: number;
  type: FieldType;
  label: string;
  value: string;
  placeholder: string;
  description: string;
  required: boolean;
  options?: string[];
};

export type Form = {
  name: string;
  fields: FormField[];
};

export type FormState = {
  fields: FormField[];
};
