import { NextFunction, Request, Response } from "express";
import { PlanService } from "../services/plan.service";

const createPlan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PlanService.createPlan(req.body);

    res.json({
      statusCode: 201,
      success: true,
      message: "plan created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await PlanService.getPlans();

    res.json({
      statusCode: 200,
      success: true,
      message: "Plans found successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getSinglePlan = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await PlanService.getSinglePlan(id);

    res.json({
      statusCode: 200,
      success: true,
      message: "Plan found successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const PlanController = {
  getPlans,
  createPlan,
  getSinglePlan,
};
