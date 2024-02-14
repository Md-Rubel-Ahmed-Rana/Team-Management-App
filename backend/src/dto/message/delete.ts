import { AutoMap } from "@automapper/classes";

export class DeleteMessageDTO {
  @AutoMap()
  id!: string;
}
