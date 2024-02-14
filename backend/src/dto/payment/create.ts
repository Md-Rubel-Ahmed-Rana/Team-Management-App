import { PlanEntity } from "@/entities/plan.entity";
import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";

export class CreatePaymentDTO {
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
