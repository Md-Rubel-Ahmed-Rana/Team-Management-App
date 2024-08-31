import { SocketContext } from "@/context/SocketContext";
import { useLeaveProjectRequestMutation } from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IProject } from "@/interfaces/project.interface";
import { IUser } from "@/interfaces/user.interface";
import { useContext } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

type Props = {
  project: IProject;
  setShowActions: (value: boolean) => void;
  setIsAddMember: (value: boolean) => void;
  setIsRemoveMember: (value: boolean) => void;
  setIsEditProject: (value: boolean) => void;
  setIsDeleteProject: (value: boolean) => void;
};

const ProjectActions = ({
  setShowActions,
  setIsAddMember,
  setIsDeleteProject,
  setIsEditProject,
  setIsRemoveMember,
  project,
}: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [leaveRequest] = useLeaveProjectRequestMutation();

  const handleLeaveRequest = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to leave from this project?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result?.isConfirmed) {
        const leaveData = {
          project: project?.id,
          member: user?.id,
          admin: project?.user?.id,
        };
        const leaveHandler = async () => {
          const result: any = await leaveRequest(leaveData);
          if (result?.data?.success) {
            toast.success(
              result?.data?.message ||
                "Your leave request has been sent to admin"
            );
            socket.emit("notification", project?.user?.id);
          } else {
            toast.success(
              result?.data?.message ||
                result?.error?.data?.message ||
                "Failed to send leave request!"
            );
          }
        };
        leaveHandler();
      }
    });
  };

  return (
    <div className="absolute right-0 text-sm top-6 flex flex-col gap-2 justify-start text-start bg-gray-200 rounded-md p-2">
      {project?.user?.id === user?.id ? (
        <>
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
        </>
      ) : (
        <button
          onClick={() => {
            setShowActions(false);
            handleLeaveRequest();
          }}
          className="bg-white text-start px-2 rounded-sm"
        >
          Request to leave
        </button>
      )}
      <button
        onClick={() => setShowActions(false)}
        className="bg-white text-start px-2 rounded-sm"
      >
        Close
      </button>
    </div>
  );
};

export default ProjectActions;
