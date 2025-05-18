export type InitialFormDataType = {
  name: string;
  surname: string;
  city: string;
  country: string;
  age: string;
  gender: string;
  contact: string;
  symptoms: string[];
  vaccination: string;
  additionalInfo: string;
  created_at?: string;
};

export const initialFormData = {
  name: "",
  surname: "",
  city: "",
  country: "",
  age: "",
  gender: "",
  contact: "",
  symptoms: [] as string[],
  vaccination: "",
  additionalInfo: "",
};
