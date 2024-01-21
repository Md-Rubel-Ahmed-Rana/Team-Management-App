import { IPlan } from "./../interfaces/plan.interface";
import { Plan } from "../models/plan.model";

const getPlans = async () => {
  const result = await Plan.find({});
  return result;
};

const createPlan = async (data: IPlan | IPlan[]) => {
  const result = await Plan.create(data);
  return result;
};

const getSinglePlan = async (id: string) => {
  const result = await Plan.findById(id);

  return result;
};

export const PlanService = {
  getPlans,
  createPlan,
  getSinglePlan,
};
