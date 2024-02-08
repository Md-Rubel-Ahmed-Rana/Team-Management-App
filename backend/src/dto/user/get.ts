import { AutoMap } from "@automapper/classes";

export class GetUserDTO {
  @AutoMap()
  id!: string;

  @AutoMap()
  name!: string;

  @AutoMap()
  email!: string;

  @AutoMap()
  department!: string;

  @AutoMap()
  designation!: string;

  @AutoMap()
  phoneNumber!: string;

  @AutoMap()
  permanentAddress!: string;

  @AutoMap()
  presentAddress!: string;

  @AutoMap()
  country!: string;

  @AutoMap()
  createdAt!: Date;

  @AutoMap()
  updatedAt!: Date;
}
