import { Types } from "mongoose";

export type IPayment = {
  userId: string;
  paymentAmount: number;
  package: Types.ObjectId;
  sessionId: string;
  status: string;
};
