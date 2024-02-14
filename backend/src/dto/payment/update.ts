import { AutoMap } from "@automapper/classes";
import { GetUserDTO } from "../user/get";
import { GetPlanDTO } from "../plan/get";

export class UpdatePaymentDTO {
  @AutoMap()
  id!: string;

  @AutoMap(() => GetUserDTO)
  user!: GetUserDTO;

  @AutoMap()
  paymentAmount!: number;

  @AutoMap(() => GetPlanDTO)
  package!: GetPlanDTO;

  @AutoMap()
  sessionId!: string;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
