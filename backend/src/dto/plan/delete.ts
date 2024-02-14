import { PlanFeature } from "@/entities/util.entity";
import { AutoMap } from "@automapper/classes";

export class DeletePlanDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  plan!: string;

  @AutoMap()
  price!: number;

  @AutoMap(() => [PlanFeature])
  features: PlanFeature[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
