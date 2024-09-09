import { PackageService } from "@/services/package.service";
import RootController from "@/shared/rootController";
import { Request, Response } from "express";
import httpStatus from "http-status";

class Controller extends RootController {
  getMyPackage = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const myPackage = await PackageService.getMyPackage(userId);
    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My package fetched successfully!",
      data: myPackage,
    });
  });
}

export const PackageController = new Controller();
