import { AutoMap } from "@automapper/classes";
import { PlanFeature } from "./util.entity";

export class PlanEntity {
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
