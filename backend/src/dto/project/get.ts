import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";
import { GetTeamDTO } from "../team/get";
import { GetUserDTO } from "../user/get";

export class GetProjectDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  category!: string;

  @AutoMap(() => UserEntity)
  user!: UserEntity;

  @AutoMap(() => GetTeamDTO)
  team!: GetTeamDTO;

  @AutoMap(() => [GetUserDTO])
  members: GetUserDTO[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
