import { Schema, model } from "mongoose";

const leaveRequestSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    member: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "ignored", "accepted"],
        default: "pending"
    }
}, 
{
    timestamps: true,
    toJSON: {
        versionKey: false
    }
})

export const TeamLeaveRequest = model("TeamLeaveRequest", leaveRequestSchema)