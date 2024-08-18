import { AutoMap } from "@automapper/classes";
import { GetUserDTO } from "../user/get";
import { ProjectEntity } from "@/entities/project.entity";
import { GetOnlyProjectForTaskDTO } from "../project/getOnlyProjectForTask";

export class GetTaskDTO {
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

  @AutoMap(() => GetOnlyProjectForTaskDTO)
  project!: GetOnlyProjectForTaskDTO;

  @AutoMap()
  status!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
