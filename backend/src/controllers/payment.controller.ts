import { Request, Response } from "express";
import { PaymentService } from "../services/payment.service";
import RootController from "../shared/rootController";
import httpStatus from "http-status";

class Controller extends RootController {
  checkout = this.catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.checkout(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payment proceed",
      data: result,
    });
  });

  myPayments = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const result = await PaymentService.myPayments(userId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Payments found",
      data: result,
    });
  });

  webhook = this.catchAsync(async (req: Request, res: Response) => {
    await PaymentService.webHook(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Webhook received successfully",
      data: { received: true },
    });
  });
}

export const PaymentController = new Controller();
