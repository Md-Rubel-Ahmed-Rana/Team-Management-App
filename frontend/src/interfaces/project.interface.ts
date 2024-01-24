export type INewProject = {
  team: string;
  user: string;
  name: string;
  category: string;
};

export type IProject = {
  _id: string;
  team: any;
  user: string;
  name: string;
  category: string;
  members: [
    {
      role: string;
      member: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
};

export const projectInit: IProject = {
  _id: "",
  name: "",
  category: "",
  createdAt: "",
  team: "",
  updatedAt: "",
  user: "",
  members: [
    {
      role: "",
      member: "",
    },
  ],
};
