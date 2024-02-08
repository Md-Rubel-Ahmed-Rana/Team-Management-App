import { TeamEntity } from "@/entities/team.entity";
import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";

export class CreateProjectDTO {
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
