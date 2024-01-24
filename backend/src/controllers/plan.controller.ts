import { Request, Response } from "express";
import { PlanService } from "../services/plan.service";
import RootController from "../shared/rootController";
import httpStatus from "http-status";

class Controller extends RootController {
  createPlan = this.catchAsync(async (req: Request, res: Response) => {
    const result = await PlanService.createPlan(req.body);

    this.apiResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Plan created successfully",
      data: result,
    });
  });

  getPlans = this.catchAsync(async (req: Request, res: Response) => {
    const result = await PlanService.getPlans();

    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Plans found successfully",
      data: result,
    });
  });

  getSinglePlan = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await PlanService.getSinglePlan(id);

    this.apiResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Plan found successfully",
      data: result,
    });
  });
}

export const PlanController = new Controller();
