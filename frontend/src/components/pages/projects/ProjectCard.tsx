import { IProject } from "@/interfaces/project.interface";
import moment from "moment";
import { useState } from "react";
import EditProjectModal from "./modals/EditProjectModal";
import Link from "next/link";
import AddMemberToProject from "./modals/AddMemberToProject";
import RemoveMemberFromProject from "./modals/RemoveMemberFromProject";
import { IUser } from "@/interfaces/user.interface";
import ProjectDeleteModal from "./modals/ProjectDeleteModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useLeaveProjectRequestMutation } from "@/features/project";
import ProjectActions from "./ProjectActions";

type Props = {
  project: IProject;
  admin: IUser;
};

const ProjectCard = ({ project }: Props) => {
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { id, name, category, team, user, members, tasks, createdAt } = project;

  return (
    <>
      <div className="border border-gray-500 p-2 lg:p-5 rounded-md flex flex-col justify-between gap-1">
        <div className="flex justify-between items-start relative">
          <span className="font-semibold">{name}</span>
          <BsThreeDotsVertical
            onClick={() => setShowActions((prev) => !prev)}
            title="Click to edit/delete project"
            className="cursor-pointer font-semibold text-xl"
          />

          {showActions && (
            <ProjectActions
              project={project}
              setShowActions={setShowActions}
              setIsAddMember={setIsAddMember}
              setIsDeleteProject={setIsDeleteProject}
              setIsEditProject={setIsEditProject}
              setIsRemoveMember={setIsRemoveMember}
            />
          )}
        </div>
        <h6 className="font-sans text-gray-500">{category}</h6>
        <h5>Team: {team?.name}</h5>
        <h5>Admin: {user?.name}</h5>
        <p>Tasks: {tasks} </p>
        <p>Members: {members} </p>
        <p className="flex items-center gap-1">
          <span> Issued:</span>
          <span className="text-sm text-gray-500">
            {moment(createdAt).fromNow()}
          </span>
        </p>

        <div className="flex justify-between items-center gap-2 mt-2">
          <Link
            href={`/tasks/${id}?project_name=${name}&project_id=${id}&project_category=${category}`}
            className="bg-blue-500 hover:bg-blue-600  px-2 py-2 text-center rounded-md text-white w-full"
          >
            All tasks
          </Link>
        </div>
      </div>

      {isDeleteProject && (
        <ProjectDeleteModal
          isOpen={isDeleteProject}
          setIsOpen={setIsDeleteProject}
          projectId={project.id}
          projectName={project.name}
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
          projectId={project.id}
          teamId={project?.team?.id}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project.id}
          teamId={project?.team?.id}
        />
      )}
    </>
  );
};

export default ProjectCard;
