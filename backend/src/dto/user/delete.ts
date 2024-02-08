import { AutoMap } from "@automapper/classes";

export class DeleteUserDTO {
  @AutoMap()
  id!: string;
}
