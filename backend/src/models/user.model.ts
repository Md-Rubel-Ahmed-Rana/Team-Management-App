import { IUser } from "@/interfaces/user.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    profile_picture: {
      type: String,
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
    },
    permanentAddress: {
      type: String,
    },
    presentAddress: {
      type: String,
    },
    country: {
      type: String,
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
