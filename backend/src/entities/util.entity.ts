import { AutoMap } from "@automapper/classes";

export class PlanFeature {
  @AutoMap()
  feature!: string;
}

export class ImageEntity {
  @AutoMap()
  image!: string;
}

export class LinkEntity {
  @AutoMap()
  link!: string;
}

export class FileEntity {
  @AutoMap()
  file!: string;
}
