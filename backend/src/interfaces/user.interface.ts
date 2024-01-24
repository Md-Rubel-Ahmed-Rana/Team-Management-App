import { Types } from "mongoose";

export type IUser = {
  _id?: Types.ObjectId;
  name: string;
  profile_picture: string;
  email: string;
  department: string;
  designation: string;
  password: string;
  phoneNumber?: string;
  permanentAddress?: string;
  presentAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
