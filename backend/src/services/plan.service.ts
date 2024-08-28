import { IPlan } from "@/interfaces/plan.interface";
import { Plan } from "@/models/plan.model";

class Service {
  async getPlans(): Promise<any> {
    const result = await Plan.find({});

    return result;
  }

  async createPlan(data: IPlan | IPlan[]): Promise<any> {
    const result = await Plan.create(data);

    return result;
  }

  async getSinglePlan(id: string): Promise<any> {
    const result = await Plan.findById(id);
    return result;
  }
}

export const PlanService = new Service();
