import { useLoggedInUserQuery } from "@/features/user";
import { IProjectForTeamDetails } from "@/interfaces/project.interface";
import { ITeamDetails, ITeamDetailsMember } from "@/interfaces/team.interface";
import { IUser } from "@/interfaces/user.interface";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProjectDeleteModal from "../../projects/modals/ProjectDeleteModal";
import EditProjectModal from "../../projects/modals/EditProjectModal";
import AddMemberToProject from "../../projects/modals/AddMemberToProject";
import RemoveMemberFromProject from "../../projects/modals/RemoveMemberFromProject";
import { useSingleTeamQuery } from "@/features/team";

type Props = {
  project: IProjectForTeamDetails;
  admin: ITeamDetailsMember;
  team: ITeamDetails;
};

const ProjectCardForTeamDetail = ({ project, admin, team }: Props) => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: singleTeam } = useSingleTeamQuery(team?.id);
  const [showActions, setShowActions] = useState(false);
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);

  return (
    <>
      <div key={project?.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h4 className="text-lg font-medium flex justify-between items-center relative">
          <span> {project?.name}</span>
          {user?.id === admin?.id && (
            <BsThreeDotsVertical
              onClick={() => setShowActions(true)}
              title="Click to edit/delete project"
              className="cursor-pointer font-semibold text-xl"
            />
          )}
          {showActions && (
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
          )}
        </h4>
        <p className="text-sm text-gray-600">Category: {project?.category}</p>
        <p className="text-sm text-gray-600">
          Created: {new Date(project?.createdAt).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Last Updated: {new Date(project?.updatedAt).toLocaleDateString()}
        </p>
        <div className="mt-2">
          <h5 className="text-md font-semibold">Members:</h5>
          {project?.members.length > 0 ? (
            <ul className="list-disc list-inside">
              {project?.members?.map((member) => (
                <li key={member?.id} className="text-sm text-gray-800">
                  {member?.name || "Unknown Member"}
                </li>
              ))}
            </ul>
          ) : (
            <p>No members</p>
          )}
        </div>
      </div>
      {isDeleteProject && (
        <ProjectDeleteModal
          isOpen={isDeleteProject}
          setIsOpen={setIsDeleteProject}
          projectId={project?.id}
          projectName={project?.name}
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
          projectId={project?.id}
          team={singleTeam?.data}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project?.id}
          team={singleTeam?.data}
        />
      )}
    </>
  );
};

export default ProjectCardForTeamDetail;
