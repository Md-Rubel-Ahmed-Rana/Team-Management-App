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
    },
    designation: {
      type: String,
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
