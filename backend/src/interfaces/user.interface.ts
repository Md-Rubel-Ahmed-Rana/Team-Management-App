import { Types } from "mongoose";

export type IUser = {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  profile_picture: string;
  department: string;
  designation: string;
  password: string;
  phoneNumber?: string;
  permanentAddress?: string;
  presentAddress?: string;
  country?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
