export type INewProject = {
  teamId: string;
  userId: string;
  name: string;
  category: string;
};

export type IProject = {
  _id: string;
  teamId: string;
  userId: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
};

export const projectInit = {
  _id: "",
  name: "",
  category: "",
  createdAt: "",
  teamId: "",
  updatedAt: "",
  userId: "",
};
