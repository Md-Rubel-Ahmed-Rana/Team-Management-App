import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";

export class TeamEntity {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  category!: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  image!: string;

  @AutoMap(() => UserEntity)
  admin!: UserEntity;

  @AutoMap(() => [UserEntity])
  activeMembers: UserEntity[] = [];

  @AutoMap(() => [UserEntity])
  pendingMembers: UserEntity[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
