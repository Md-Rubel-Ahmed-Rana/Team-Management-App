export type INewTask = {
  name: string;
  projectId: string;
  assignedMember: string;
  assignedBy: string;
  status: "todo" | "ongoing" | "completed";
};
