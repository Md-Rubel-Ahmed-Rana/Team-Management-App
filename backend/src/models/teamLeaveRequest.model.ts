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
    }
}, 
{
    timestamps: true,
    toJSON: {
        versionKey: false
    }
})

export const TeamLeaveRequest = model("TeamLeaveRequest", leaveRequestSchema)