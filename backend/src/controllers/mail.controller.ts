import { MailService } from "@/services/mail.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  contactMail = this.catchAsync(async (req: Request, res: Response) => {
    const result = await MailService.contactMail(req.body);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Your email has been sent to",
      data: result,
    });
  });
}

export const MailController = new Controller();
