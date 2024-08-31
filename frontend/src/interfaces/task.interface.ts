export type INewTask = {
  name: string;
  project: string;
  assignedTo: string;
  assignedBy: string;
  deadline: string;
  status: "todo" | "ongoing" | "completed";
};

export type INewTaskForSocket = {
  id: string;
  name: string;
  deadline: string;
  project: {
    id: string;
    name: string;
    category: string;
  };
  assignedTo: {
    id: string;
    name: string;
    profile_picture: string;
  };
  assignedBy: {
    id: string;
    name: string;
    profile_picture: string;
  };
  status: string;
  createdAt: Date;
  updatedAt: Date;
};
