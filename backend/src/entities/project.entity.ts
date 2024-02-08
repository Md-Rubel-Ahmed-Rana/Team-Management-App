import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";
import { GetUserDTO } from "@/dto/user/get";

export class MemberEntity {
  @AutoMap()
  role!: string;

  @AutoMap(() => GetUserDTO)
  member!: GetUserDTO;
}

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

  @AutoMap(() => [MemberEntity])
  members: MemberEntity[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
