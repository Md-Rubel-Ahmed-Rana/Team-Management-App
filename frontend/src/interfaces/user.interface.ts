export type IUser = {
  _id: string;
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
  _id: "",
  name: "",
  profile_picture: "",
  email: "",
  department: "",
  designation: "",
  password: "",
  createdAt: "",
  updatedAt: "",
};
