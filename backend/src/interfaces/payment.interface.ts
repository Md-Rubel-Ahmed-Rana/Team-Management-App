import { Types } from "mongoose";

export type IPayment = {
  user: string;
  paymentAmount: number;
  package: Types.ObjectId;
  sessionId: string;
  sessionUrl: string;
  status: string;
};
