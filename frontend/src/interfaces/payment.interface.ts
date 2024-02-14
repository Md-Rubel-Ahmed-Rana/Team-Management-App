import { IPrice } from "./price.interface";

export type IPayment = {
  id: string;
  userId: string;
  package: IPrice;
  sessionId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};
