import { Types } from "mongoose";

export type IUser = {
  _id: Types.ObjectId; // or  id?: Types.ObjectId
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
  createdAt?: Date; // after created
  updatedAt?: Date; // after created
};

export type IGetUser = {
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
