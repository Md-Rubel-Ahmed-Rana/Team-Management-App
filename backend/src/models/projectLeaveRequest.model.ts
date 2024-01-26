import { Schema, model } from "mongoose";

const leaveRequestSchema = new Schema({
    admin: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    member: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
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

export const ProjectLeaveRequest = model("ProjectLeaveRequest", leaveRequestSchema)