import { AutoMap } from "@automapper/classes";
import { GetUserDTO } from "../user/get";

export class GetTeamDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  category!: string;

  @AutoMap()
  description!: string;

  @AutoMap()
  image!: string;

  @AutoMap(() => GetUserDTO)
  admin!: GetUserDTO;

  @AutoMap(() => [GetUserDTO])
  activeMembers: GetUserDTO[] = [];

  @AutoMap(() => [GetUserDTO])
  pendingMembers: GetUserDTO[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
