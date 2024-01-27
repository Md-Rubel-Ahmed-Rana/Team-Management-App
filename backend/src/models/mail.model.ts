import { Schema, model } from "mongoose";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, toJSON: { versionKey: false } }
);

const ContactMail = model("ContactMail", contactSchema);

export const MailModels = {
  ContactMail,
};
