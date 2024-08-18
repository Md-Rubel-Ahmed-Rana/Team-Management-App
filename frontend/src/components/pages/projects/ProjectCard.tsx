import ProjectDeleteModal from "@/components/shared/ProjectDeleteModal";
import { IProject } from "@/interfaces/project.interface";
import moment from "moment";
import { useState } from "react";
import EditProjectModal from "./desktop/EditProjectModal";
import Link from "next/link";
import AddMemberToProject from "./desktop/AddMemberToProject";
import RemoveMemberFromProject from "./desktop/RemoveMemberFromProject";

type Props = {
  project: IProject;
};

const ProjectCard = ({ project }: Props) => {
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const { id, name, category, user, team, createdAt } = project;
  return (
    <>
      <div className="border p-2 lg:p-5 rounded-md flex flex-col justify-between gap-1">
        <h2 className="font-semibold">{name}</h2>
        <h6 className="font-sans text-gray-500">{category}</h6>
        <p>Tasks: 0</p>
        <p>Members: 0</p>
        <p className="flex items-center gap-1">
          <span> Issued:</span>
          <span className="text-sm text-gray-500">
            {moment(createdAt).fromNow()}
          </span>
        </p>
        <div className="flex justify-between items-center gap-2 text-sm">
          <button
            onClick={() => setIsAddMember(true)}
            className="bg-blue-600 px-2 py-1 rounded-md text-white w-full"
          >
            Add Member
          </button>
          <button
            onClick={() => setIsRemoveMember(true)}
            className="bg-blue-600 px-2 py-1 rounded-md text-white w-full"
          >
            Remove Member
          </button>
        </div>
        <div className="flex justify-between items-center gap-2 text-sm mt-2">
          <Link
            href={`/tasks/${id}`}
            className="bg-blue-600 px-2 py-1 text-center rounded-md text-white w-full"
          >
            All tasks
          </Link>
          <button
            onClick={() => setIsEditProject(true)}
            className="bg-blue-600 px-2 py-1 rounded-md text-white w-full"
          >
            Edit
          </button>
          <button
            onClick={() => setIsDeleteProject(true)}
            className="bg-blue-600 px-2 py-1 rounded-md text-white w-full"
          >
            Delete
          </button>
        </div>
      </div>
      {isDeleteProject && (
        <ProjectDeleteModal
          isOpen={isDeleteProject}
          setIsOpen={setIsDeleteProject}
          projectId={id}
          projectName={name}
        />
      )}
      {isEditProject && (
        <EditProjectModal
          isEdit={isEditProject}
          setIsEdit={setIsEditProject}
          project={project}
        />
      )}
      {isAddMember && (
        <AddMemberToProject
          isOpen={isAddMember}
          setIsOpen={setIsAddMember}
          projectId={id}
          team={team}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={id}
          team={team}
        />
      )}
    </>
  );
};

export default ProjectCard;
