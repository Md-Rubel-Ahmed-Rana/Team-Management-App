import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React, { useContext, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import ProjectDeleteModal from "../../projects/modals/ProjectDeleteModal";
import EditProjectModal from "../../projects/modals/EditProjectModal";
import AddMemberToProject from "../../projects/modals/AddMemberToProject";
import RemoveMemberFromProject from "../../projects/modals/RemoveMemberFromProject";
import { IProject } from "@/interfaces/project.interface";
import { ITeam } from "@/interfaces/team.interface";
import dynamic from "next/dynamic";
import { MenuProps } from "antd";
import { SocketContext } from "@/context/SocketContext";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useSendProjectLeaveRequestMutation } from "@/features/project";

const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  project: IProject;
  team: ITeam;
};

const ProjectCardForTeamDetail = ({ project, team }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);
  const leaveRequestIds = project?.leaveRequests?.map((member) => member?.id);
  const [leaveRequest] = useSendProjectLeaveRequestMutation();

  const handleLeaveRequest = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to leave from this project?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        handleSendLeaveRequest({
          projectId: project?.id,
          memberId: user?.id,
        });
      }
    });
  };

  const handleSendLeaveRequest = async (data: {
    projectId: string;
    memberId: string;
  }) => {
    const result: any = await leaveRequest(data);
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Your leave request has been sent to admin"
      );
      socket.emit("notification", project?.user);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to send leave request!"
      );
    }
  };

  const actions: MenuProps["items"] = [
    {
      key: "1",
      label:
        user?.id === project?.user ? (
          <Button
            type="default"
            className="w-full"
            onClick={() => {
              setIsAddMember(true);
            }}
          >
            Add Member
          </Button>
        ) : null,
    },
    {
      key: "2",
      label:
        user?.id === project?.user ? (
          <Button
            className="w-full"
            type="default"
            onClick={() => {
              setIsRemoveMember(true);
            }}
          >
            Remove Member
          </Button>
        ) : null,
    },
    {
      key: "3",
      label:
        user?.id === project?.user ? (
          <Button
            onClick={() => {
              setIsEditProject(true);
            }}
            className="w-full"
            type="default"
          >
            Edit Project
          </Button>
        ) : null,
    },
    {
      key: "4",
      label:
        user?.id === project?.user ? (
          <Button
            className="w-full"
            type="default"
            onClick={() => {
              setIsDeleteProject(true);
            }}
          >
            Delete
          </Button>
        ) : null,
    },
    {
      key: "5",
      label:
        user?.id !== project?.user && !leaveRequestIds?.includes(user?.id) ? (
          <Button
            className="w-full"
            type="default"
            onClick={handleLeaveRequest}
          >
            Request to leave
          </Button>
        ) : null,
    },
    {
      key: "6",
      label:
        user?.id !== project?.user && leaveRequestIds?.includes(user?.id) ? (
          <Button className="w-full" type="default">
            Cancel leave request
          </Button>
        ) : null,
    },
  ].filter((action) => action.label !== null);

  return (
    <>
      <div key={project?.id} className="p-4 bg-gray-100 rounded-lg shadow-md">
        <h4 className="text-lg font-medium flex justify-between items-center relative">
          <span> {project?.name}</span>
          <Dropdown
            menu={{ items: actions }}
            placement="bottomRight"
            arrow
            className="border border-blue-600 px-2"
          >
            <Button type="text">
              <BsThreeDotsVertical className="text-xl" />
            </Button>
          </Dropdown>
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
          teamId={team.id}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project?.id}
          teamId={team?.id}
        />
      )}
    </>
  );
};

export default ProjectCardForTeamDetail;
