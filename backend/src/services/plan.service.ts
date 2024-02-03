import { IPlan } from "@/interfaces/plan.interface";
import { Plan } from "@/models/plan.model";

class Service {
  async getPlans() {
    const result = await Plan.find({});
    return result;
  }

  async createPlan(data: IPlan | IPlan[]) {
    const result = await Plan.create(data);
    return result;
  }

  async getSinglePlan(id: string) {
    const result = await Plan.findById(id);

    return result;
  }
}

export const PlanService = new Service();
