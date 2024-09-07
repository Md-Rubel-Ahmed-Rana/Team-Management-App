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
      required: false,
      default: "",
    },
    designation: {
      type: String,
      required: false,
      default: "",
    },
    phoneNumber: {
      type: String,
      required: false,
      default: "",
    },
    permanentAddress: {
      type: String,
      required: false,
      default: "",
    },
    presentAddress: {
      type: String,
      required: false,
      default: "",
    },
    country: {
      type: String,
      required: false,
      default: "",
    },
    password: {
      type: String,
      default: "",
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
