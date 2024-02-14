export type INewProject = {
  team: string;
  user: string;
  name: string;
  category: string;
};

export type IProject = {
  id: string;
  team: any;
  user: string;
  name: string;
  category: string;
  members: [string];
  createdAt: string;
  updatedAt: string;
};

export const projectInit: IProject = {
  id: "",
  name: "",
  category: "",
  createdAt: "",
  team: "",
  updatedAt: "",
  user: "",
  members: [""],
};
