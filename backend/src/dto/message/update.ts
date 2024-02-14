import { FileEntity, ImageEntity, LinkEntity } from "@/entities/util.entity";
import { AutoMap } from "@automapper/classes";
import { GetUserDTO } from "../user/get";
import { TeamEntity } from "@/entities/team.entity";

export class UpdateMessageDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  type!: string;

  @AutoMap()
  text!: string;

  @AutoMap(() => TeamEntity)
  conversationId!: TeamEntity;

  @AutoMap(() => GetUserDTO)
  poster!: GetUserDTO;

  @AutoMap(() => [ImageEntity])
  images: ImageEntity[] = [];

  @AutoMap(() => [FileEntity])
  files: FileEntity[] = [];

  @AutoMap(() => [LinkEntity])
  links: LinkEntity[] = [];

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
