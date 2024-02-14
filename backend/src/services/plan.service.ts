import { IPlan } from "@/interfaces/plan.interface";
import { Plan } from "@/models/plan.model";
import { mapper } from "../mapper";
import { PlanEntity } from "@/entities/plan.entity";
import { ModelIdentifier } from "@automapper/core";
import { GetPlanDTO } from "@/dto/plan/get";
import { CreatePlanDTO } from "@/dto/plan/create";

class Service {
  async getPlans(): Promise<GetPlanDTO[]> {
    const result = await Plan.find({});
    const mappedData = mapper.mapArray(
      result,
      PlanEntity as ModelIdentifier,
      GetPlanDTO
    );
    return mappedData;
  }

  async createPlan(data: IPlan | IPlan[]): Promise<CreatePlanDTO> {
    const result = await Plan.create(data);
    const mappedData = mapper.map(
      result,
      PlanEntity as ModelIdentifier,
      CreatePlanDTO
    );
    return mappedData;
  }

  async getSinglePlan(id: string): Promise<GetPlanDTO> {
    const result = await Plan.findById(id);
    const mappedData = mapper.map(
      result,
      PlanEntity as ModelIdentifier,
      GetPlanDTO
    );
    return mappedData;
  }
}

export const PlanService = new Service();
