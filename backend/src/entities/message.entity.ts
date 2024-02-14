import { AutoMap } from "@automapper/classes";
import { FileEntity, ImageEntity, LinkEntity } from "./util.entity";
import { UserEntity } from "./user.entity";
import { TeamEntity } from "./team.entity";

export class MessageEntity {
  @AutoMap()
  id!: string;

  @AutoMap()
  type!: string;

  @AutoMap()
  text!: string;

  @AutoMap(() => TeamEntity)
  conversationId!: TeamEntity;

  @AutoMap(() => UserEntity)
  poster!: UserEntity;

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
