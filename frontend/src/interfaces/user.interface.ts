export type IUser = {
  id: string;
  name: string;
  profile_picture: string;
  email: string;
  department: string;
  designation: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
};

export const userInitData: IUser = {
  id: "",
  name: "",
  profile_picture: "",
  email: "",
  department: "",
  designation: "",
  password: "",
  createdAt: "",
  updatedAt: "",
};
