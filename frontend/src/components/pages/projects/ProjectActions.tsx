import { SocketContext } from "@/context/SocketContext";
import {
  useCancelProjectLeaveRequestMutation,
  useSendProjectLeaveRequestMutation,
} from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IProject } from "@/interfaces/project.interface";
import { IUser } from "@/interfaces/user.interface";
import { MenuProps } from "antd";
import dynamic from "next/dynamic";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import Swal from "sweetalert2";
import ProjectDeleteModal from "./modals/ProjectDeleteModal";
import EditProjectModal from "./modals/EditProjectModal";
import AddMemberToProject from "./modals/AddMemberToProject";
import RemoveMemberFromProject from "./modals/RemoveMemberFromProject";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  project: IProject;
};

const ProjectActions = ({ project }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const leaveRequestIds = project?.leaveRequests?.map((member) => member?.id);
  const [leaveRequest] = useSendProjectLeaveRequestMutation();
  const [cancelLeaveRequest] = useCancelProjectLeaveRequestMutation();
  const [isDeleteProject, setIsDeleteProject] = useState(false);
  const [isEditProject, setIsEditProject] = useState(false);
  const [isAddMember, setIsAddMember] = useState(false);
  const [isRemoveMember, setIsRemoveMember] = useState(false);

  const handleLeaveRequest = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to leave from this project?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        handleSendLeaveRequest();
      }
    });
  };

  const handleSendLeaveRequest = async () => {
    const result: any = await leaveRequest({
      projectId: project?.id,
      memberId: user?.id,
    });
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

  const handleCancelLeaveRequest = async () => {
    Swal.fire({
      title: "Good Job!",
      text: "Are you sure to cancel leave request?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        handleLeaveRequestCancel();
      }
    });
  };

  const handleLeaveRequestCancel = async () => {
    const result: any = await cancelLeaveRequest({
      projectId: project?.id,
      memberId: user?.id,
    });
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Your leave request has been cancelled!"
      );
      socket.emit("notification", project?.user);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to cancel leave request!"
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
          <Button
            onClick={handleCancelLeaveRequest}
            className="w-full"
            type="default"
          >
            Cancel leave request
          </Button>
        ) : null,
    },
  ].filter((action) => action.label !== null);
  return (
    <>
      <Dropdown
        menu={{ items: actions }}
        placement="bottomRight"
        arrow
        className="border border-blue-600 px-1"
      >
        <Button type="text">
          <BsThreeDotsVertical className="text-lg" />
        </Button>
      </Dropdown>
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
          projectId={project.id}
          teamId={project?.team}
        />
      )}

      {isRemoveMember && (
        <RemoveMemberFromProject
          isRemove={isRemoveMember}
          setIsRemove={setIsRemoveMember}
          projectId={project.id}
          teamId={project?.team}
        />
      )}
    </>
  );
};

export default ProjectActions;
