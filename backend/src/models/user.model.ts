import { IUser } from "@/interfaces/user.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    profile_picture: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    permanentAddress: {
      type: String,
      required: false,
    },
    presentAddress: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
    },
  }
);

const User = model("User", userSchema);

export default User;
