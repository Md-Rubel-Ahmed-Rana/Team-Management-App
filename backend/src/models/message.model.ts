import { Schema, model } from "mongoose";
import { IMessage } from "../interfaces/message.interface";

const messageSchema = new Schema<IMessage>({
  poster: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["announcement", "resources", "discussion"],
  },
  text: {
    type: String,
  },
  images: [{ type: String }],
  files: [{ type: String }],
  links: [{ type: String }],
});

export const Message = model<IMessage>("Message", messageSchema);
