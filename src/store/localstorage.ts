import type { FormField } from "./form.types";

export interface SavedForm {
  id: string;
  name: string;
  createdAt: string;
  fields: FormField[];
}

export const saveFormToLocalStorage = (form: SavedForm) => {
  const existing = JSON.parse(
    localStorage.getItem("myForms") || "[]"
  ) as SavedForm[];
  existing.push(form);
  localStorage.setItem("myForms", JSON.stringify(existing));
};

export const getAllForms = (): SavedForm[] => {
  return JSON.parse(localStorage.getItem("myForms") || "[]");
};

export const getFormById = (id: string): SavedForm | undefined => {
  const forms = getAllForms();
  return forms.find((f) => f.id === id);
};
