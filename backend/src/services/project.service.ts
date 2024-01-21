import { Project } from "../models/project.model";

const createProject = (data: any) => {
  const result = Project.create(data);
  return result;
};

const getProjectsByTeamId = (teamId: string) => {
  return Project.find({ teamId }).populate("members.member").exec();
};

const myProjects = (userId: string) => {
  return Project.find({ userId }).select({ name: 1, category: 1, userId: 1 });
};

export const ProjectService = {
  createProject,
  getProjectsByTeamId,
  myProjects,
};
