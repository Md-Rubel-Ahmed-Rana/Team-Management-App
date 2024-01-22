export type INewTask = {
  name: string;
  projectId: string;
  assignedMember: string;
  assignedBy: string;
  deadline: string;
  status: "todo" | "ongoing" | "completed";
};
