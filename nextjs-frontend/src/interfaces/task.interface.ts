export type INewTask = {
  name: string;
  project: string;
  assignedTo: string;
  assignedBy: string;
  deadline: string;
  status: "todo" | "ongoing" | "completed";
};
