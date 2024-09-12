import { Types } from "mongoose";

export type IPayment = {
  user: Types.ObjectId | string;
  paymentAmount: number;
  plan: Types.ObjectId | string;
  sessionId: string;
  sessionUrl: string;
  status?: string;
};

export type IPlanItem = {
  id: string;
  user: string;
  name: string;
  price: number;
  quantity: number;
};
