import { Project } from "../models/project.model";

const createProject = (data: any) => {
  const result = Project.create(data);
  return result;
};

const getProjectsByTeamId = (teamId: string) => {
  return Project.find({ teamId }).populate("members.member").exec();
};

export const ProjectService = {
  createProject,
  getProjectsByTeamId,
};
