import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";
import { GetProjectDTO } from "../project/get";
import { GetUserDTO } from "../user/get";

export class UpdateProjectLeaveDTO {
  @AutoMap()
  id!: string;

  @AutoMap(() => UserEntity)
  admin!: UserEntity;

  @AutoMap(() => GetProjectDTO)
  project!: GetProjectDTO;

  @AutoMap(() => GetUserDTO)
  member!: GetUserDTO;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
