import { Schema, model } from "mongoose";
import { IUser } from "../interfaces/user.interface";

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
    password: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
    },
  }
);

const User = model("User", userSchema);

export default User;
