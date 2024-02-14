import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";

export class TeamLeaveEntity {
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
