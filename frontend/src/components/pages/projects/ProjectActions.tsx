import React, { useState } from "react";
import ProjectDeleteModal from "./modals/ProjectDeleteModal";
import EditProjectModal from "./modals/EditProjectModal";
import AddMemberToProject from "./modals/AddMemberToProject";
import RemoveMemberFromProject from "./modals/RemoveMemberFromProject";
import { IProject } from "@/interfaces/project.interface";
import { ITeam, ITeamDetails } from "@/interfaces/team.interface";

type Props = {
  project: IProject;
  team: ITeam | ITeamDetails;
  setShowActions: (value: boolean) => void;
};

const ProjectActions = ({ project, team, setShowActions }: Props) => {
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  return (
    <>
      <div className="absolute right-0 font-sans top-6 flex flex-col gap-2 justify-start text-start dark:bg-gray-700 bg-gray-200 rounded-md p-2">
        <button
          onClick={() => {
            setShowActions(false);
            setIsAddMember(true);
          }}
          className="bg-white text-start px-2 rounded-sm"
        >
          Add Member
        </button>
        <button
          onClick={() => {
            setShowActions(false);
            setIsRemoveMember(true);
          }}
          className="bg-white text-start px-2 rounded-sm"
        >
          Remove Member
        </button>
        <button
          onClick={() => {
            setIsEditProject(true);
            setShowActions(false);
          }}
          className="bg-white text-start px-2 rounded-sm"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setShowActions(false);
            setIsDeleteProject(true);
          }}
          className="bg-white text-start px-2 rounded-sm"
        >
          Delete
        </button>
        <button
          onClick={() => setShowActions(false)}
          className="bg-white text-start px-2 rounded-sm"
        >
          Close
        </button>
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
          team={team}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project.id}
          team={team}
        />
      )}
    </>
  );
};

export default ProjectActions;
