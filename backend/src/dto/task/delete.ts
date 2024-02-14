import { AutoMap } from "@automapper/classes";

export class DeleteTaskDTO {
  @AutoMap()
  id!: string;
}
