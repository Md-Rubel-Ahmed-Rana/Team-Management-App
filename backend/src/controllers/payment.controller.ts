import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

const checkout = async (req: Request, res: Response) => {
  const result = await PaymentService.checkout(req.body);

  res.json({
    success: true,
    message: "Payment proceed",
    data: result,
  });
};

const stripWebhook = async (req: Request, res: Response) => {
  await PaymentService.webHook(req.body);

  res.json({ received: true });
};

export const PaymentController = {
  checkout,
  stripWebhook,
};
