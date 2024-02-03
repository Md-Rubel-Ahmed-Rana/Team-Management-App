import { IPlan } from "@/interfaces/plan.interface";
import { Schema, model } from "mongoose";

const planSchema = new Schema<IPlan>(
  {
    plan: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: [String],
  },
  { timestamps: true }
);

export const Plan = model("Plan", planSchema);
