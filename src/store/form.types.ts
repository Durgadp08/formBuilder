export type FieldType = "text" | "date" | "textarea";

export type FormField = {
  id: number;
  type: FieldType;
  label: string;
  value: string;
  required: boolean;
};

export type FormState = {
  fields: FormField[];
};
