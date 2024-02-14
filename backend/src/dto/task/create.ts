import { AutoMap } from "@automapper/classes";
import { ProjectEntity } from "@/entities/project.entity";
import { UserEntity } from "@/entities/user.entity";

export class CreateTaskDTO {
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
