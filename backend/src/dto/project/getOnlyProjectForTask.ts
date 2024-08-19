import { AutoMap } from "@automapper/classes";

export class GetOnlyProjectForTaskDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  category!: string;
}
