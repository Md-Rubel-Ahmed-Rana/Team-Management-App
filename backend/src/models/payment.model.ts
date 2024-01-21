import { Schema, model } from "mongoose";
import { IPayment } from "../interfaces/payment.interface";

const paymentSchema = new Schema<IPayment>(
  {
    userId: {
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
