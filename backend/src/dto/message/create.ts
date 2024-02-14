import { TeamEntity } from "@/entities/team.entity";
import { UserEntity } from "@/entities/user.entity";
import { FileEntity, ImageEntity, LinkEntity } from "@/entities/util.entity";
import { AutoMap } from "@automapper/classes";

export class CreateMessageDTO {
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
