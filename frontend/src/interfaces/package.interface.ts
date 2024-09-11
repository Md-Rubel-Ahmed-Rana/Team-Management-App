export type IPackageData = {
  id: string;
  user: string;
  packages: PackageDetail[];
  createdAt: string;
  updatedAt: string;
};

export type PackageDetail = {
  limit: Limit;
  plan: IPlan;
  isCurrent: boolean;
  id: string;
  payment: IPayment;
  start: Date;
  end: Date;
};

type Limit = {
  team: TeamLimit;
  projectCount: number;
};

type TeamLimit = {
  teamCount: number;
  memberCount: number;
};

export type IPlan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

export type IPayment = {
  id: string;
  user: string;
  plan: string;
  paymentAmount: number;
  sessionId: string;
  sessionUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
