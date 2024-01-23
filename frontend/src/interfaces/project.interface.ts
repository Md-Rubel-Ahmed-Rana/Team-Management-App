import { ITeam } from "./team.interface";

export type INewProject = {
  teamId: string;
  userId: string;
  name: string;
  category: string;
};

export type IProject = {
  _id: string;
  teamId: any;
  userId: string;
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
  teamId: "",
  updatedAt: "",
  userId: "",
  members: [
    {
      role: "",
      member: "",
    },
  ],
};
