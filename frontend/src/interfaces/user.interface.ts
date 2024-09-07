export type IUser = {
  id: string;
  name: string;
  email: string;
  profile_picture: string;
  department: string;
  designation: string;
  phoneNumber: string;
  permanentAddress: string;
  presentAddress: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
};

export const userInitData: IUser = {
  id: "",
  name: "",
  profile_picture: "",
  email: "",
  department: "",
  designation: "",
  phoneNumber: "",
  permanentAddress: "",
  presentAddress: "",
  country: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};
