export type IUser = {
  _id?: string;
  name: string;
  profile_picture: string;
  email: string;
  department: string;
  designation: string;
  password: string;
  confirm_password?: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
};
