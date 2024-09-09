import { Types } from "mongoose";

export type IPackage = {
  plan: Types.ObjectId;
  paymentId: Types.ObjectId;
  limit: {
    team: {
      teamCount: number;
      memberCount: number;
    };
    projectCount: number;
  };
  isCurrent: boolean;
};

export type INewPackage = {
  user: Types.ObjectId;
  packages: IPackage[];
};
