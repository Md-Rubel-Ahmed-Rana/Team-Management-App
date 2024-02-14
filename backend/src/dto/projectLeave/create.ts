import { ProjectEntity } from "@/entities/project.entity";
import { UserEntity } from "@/entities/user.entity";
import { AutoMap } from "@automapper/classes";

export class CreateProjectLeaveDTO {
  @AutoMap()
  id!: string;

  @AutoMap(() => UserEntity)
  admin!: UserEntity;

  @AutoMap(() => ProjectEntity)
  project!: ProjectEntity;

  @AutoMap(() => UserEntity)
  member!: UserEntity;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
