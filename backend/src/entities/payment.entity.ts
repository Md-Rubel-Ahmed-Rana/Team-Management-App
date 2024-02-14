import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { PlanEntity } from "./plan.entity";

export class PaymentEntity {
  @AutoMap()
  id!: string;

  @AutoMap(() => UserEntity)
  user!: UserEntity;

  @AutoMap()
  paymentAmount!: number;

  @AutoMap(() => PlanEntity)
  package!: PlanEntity;

  @AutoMap()
  sessionId!: string;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
