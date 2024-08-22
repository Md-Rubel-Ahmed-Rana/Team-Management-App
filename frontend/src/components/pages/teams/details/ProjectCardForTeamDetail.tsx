import { useGetUsersQuery, useLoggedInUserQuery } from "@/features/user";
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
import ProjectActions from "../../projects/ProjectActions";

type Props = {
  project: IProjectForTeamDetails;
  team: ITeamDetails;
};

const ProjectCardForTeamDetail = ({ project, team }: Props) => {
  const projectForAction: any = project;
  const { data: usersData } = useGetUsersQuery({});
  const { data: singleTeam } = useSingleTeamQuery(team?.id);
  const [showActions, setShowActions] = useState(false);
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const projectAdmin = usersData?.data?.find(
    (usr: IUser) => usr?.id === projectForAction?.user
  );
  const projectData = { ...projectForAction, user: projectAdmin };

  return (
    <>
      <div key={project?.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h4 className="text-lg font-medium flex justify-between items-center relative">
          <span> {project?.name}</span>
          <BsThreeDotsVertical
            onClick={() => setShowActions(true)}
            title="Click to edit/delete project"
            className="cursor-pointer font-semibold text-xl"
          />
          {showActions && (
            <ProjectActions
              project={projectData}
              setIsAddMember={setIsAddMember}
              setIsDeleteProject={setIsDeleteProject}
              setIsEditProject={setIsEditProject}
              setIsRemoveMember={setIsRemoveMember}
              setShowActions={setShowActions}
            />
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
                <li
                  key={member?.id || Math.random()}
                  className="text-sm text-gray-800"
                >
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
          teamId={singleTeam?.data?.id}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project?.id}
          teamId={singleTeam?.data?.id}
        />
      )}
    </>
  );
};

export default ProjectCardForTeamDetail;
