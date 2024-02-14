import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";
import { GetUserDTO } from "../user/get";
import { GetTeamDTO } from "../team/get";

export class UpdateTeamLeaveDTO {
  @AutoMap()
  id!: string;

  @AutoMap(() => UserEntity)
  admin!: UserEntity;

  @AutoMap(() => GetTeamDTO)
  team!: GetTeamDTO;

  @AutoMap(() => GetUserDTO)
  member!: GetUserDTO;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
