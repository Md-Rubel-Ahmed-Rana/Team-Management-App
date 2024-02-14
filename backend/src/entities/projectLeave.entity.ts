import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { ProjectEntity } from "./project.entity";

export class ProjectLeaveEntity {
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
