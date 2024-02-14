import { AutoMap } from "@automapper/classes";
import { UserEntity } from "./user.entity";
import { ProjectEntity } from "./project.entity";

export class TaskEntity {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  deadline!: string;

  @AutoMap(() => UserEntity)
  assignedTo!: UserEntity;

  @AutoMap(() => UserEntity)
  assignedBy!: UserEntity;

  @AutoMap(() => ProjectEntity)
  project!: ProjectEntity;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
