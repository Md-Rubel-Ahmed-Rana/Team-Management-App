import { AutoMap } from "@automapper/classes";
import { GetUserDTO } from "../user/get";
import { ProjectEntity } from "@/entities/project.entity";

export class UpdateTaskDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  deadline!: string;

  @AutoMap(() => GetUserDTO)
  assignedTo!: GetUserDTO;

  @AutoMap(() => GetUserDTO)
  assignedBy!: GetUserDTO;

  @AutoMap(() => ProjectEntity)
  project!: ProjectEntity;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
