import { Project } from "../models/project.model";

const createProject = (data: any) => {
  const result = Project.create(data);
  return result;
};

const getProjectsByTeamId = (teamId: string) => {
  return Project.find({ teamId }).populate("members.member").exec();
};

const myProjects = (userId: string) => {
  return Project.find({ userId });
};

const getSingleProject = (id: string) => {
  return Project.findById(id)
    .populate("members.member")
    .populate("teamId", "name")
    .exec();
};

const updateProject = async (id: string, data: any) => {
  const { name, category } = data;
  const result = await Project.findOneAndUpdate(
    { _id: id },
    { $set: { name, category } },
    { new: true }
  );
  return result;
};

const addMember = async (projectId: string, memberId: string, role: string) => {
  const project = await Project.findById(projectId);

  if (!project) {
    return { message: "Project not found", success: false };
  }
  const existingMember = project.members.find(
    (member) => member.member == memberId
  );

  if (existingMember) {
    return { message: "Member is already part of the project", success: false };
  }

  project.members.push({ role, member: memberId });
  await project.save();
};

export const ProjectService = {
  createProject,
  getProjectsByTeamId,
  myProjects,
  addMember,
  getSingleProject,
  updateProject,
};
