import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";

export class ProjectEntity {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  category!: string;

  @AutoMap(() => UserEntity)
  user!: UserEntity;

  @AutoMap(() => TeamEntity)
  team!: TeamEntity;

  @AutoMap(() => [UserEntity])
  members: UserEntity[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
