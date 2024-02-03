import { IPayment } from "@/interfaces/payment.interface";
import { Schema, model } from "mongoose";

const paymentSchema = new Schema<IPayment>(
  {
    user: {
      type: String,
      required: true,
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "failed"],
      default: "failed",
    },
  },
  { timestamps: true }
);

export const Payment = model("Payment", paymentSchema);
