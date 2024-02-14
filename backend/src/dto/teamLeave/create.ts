import { TeamEntity } from "@/entities/team.entity";
import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";

export class CreateTeamLeaveDTO {
  @AutoMap()
  id!: string;

  @AutoMap(() => UserEntity)
  admin!: UserEntity;

  @AutoMap(() => TeamEntity)
  team!: TeamEntity;

  @AutoMap(() => UserEntity)
  member!: UserEntity;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
