import { INotification } from "@/interfaces/notification.interface";
import { NotificationEnums, NotificationStatusEnum } from "enums";
import { model, Schema } from "mongoose";

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(NotificationEnums),
      required: true,
    },
    link: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(NotificationStatusEnum),
      default: "unread",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Notification = model("Notification", notificationSchema);
