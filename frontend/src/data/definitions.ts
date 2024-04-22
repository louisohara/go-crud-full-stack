export type User = {
  ID: number;
  firstname: string;
  surname: string;
  email: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
  dob: string;
};

export type File = {
  file: string;
};

export type Admin = {
  id: string;
  email: string;
  password: string;
  created_at: string;
  deleted_at: string;
  updated_at: string;
};

export type ErrorMessage = {
  error: string;
};
