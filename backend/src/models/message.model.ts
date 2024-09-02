import { IMessage } from "@/interfaces/message.interface";
import { Schema, model } from "mongoose";

const messageSchema = new Schema<IMessage>(
  {
    poster: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    conversationId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["announcement", "resources", "discussion", "one-to-one"],
    },
    text: {
      type: String,
    },
    images: [{ type: String }],
    files: [{ type: String }],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Message = model<IMessage>("Message", messageSchema);
