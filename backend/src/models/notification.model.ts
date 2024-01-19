import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
  },
});

const Notification = model("Notification", NotificationSchema);

export default Notification;
