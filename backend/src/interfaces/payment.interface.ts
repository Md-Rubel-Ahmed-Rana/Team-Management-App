import { Types } from "mongoose";

export type IPayment = {
  user: Types.ObjectId;
  paymentAmount: number;
  plan: Types.ObjectId;
  sessionId: string;
  sessionUrl: string;
  status: string;
};
