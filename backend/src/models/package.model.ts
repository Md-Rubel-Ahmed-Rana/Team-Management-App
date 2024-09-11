import { INewPackage } from "@/interfaces/package.interface";
import { model, Schema } from "mongoose";
import dayjs from "dayjs";

export const packageSchema = new Schema<INewPackage>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    packages: [
      {
        plan: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Plan",
        },
        payment: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Payment",
        },
        limit: {
          team: {
            teamCount: {
              type: Number,
              required: true,
            },
            memberCount: {
              type: Number,
              required: true,
            },
          },
          projectCount: {
            type: Number,
            required: true,
          },
        },
        isCurrent: {
          type: Boolean,
          default: true,
        },
        start: {
          type: Date,
          default: Date.now,
          required: true,
        },
        end: {
          type: Date,
          default: () => dayjs().add(1, "month").toDate(),
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Package = model<INewPackage>("Package", packageSchema);
