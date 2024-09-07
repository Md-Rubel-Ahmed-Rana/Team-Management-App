import { SocketContext } from "@/context/SocketContext";
import {
  useAcceptProjectLeaveRequestMutation,
  useRejectProjectLeaveRequestMutation,
} from "@/features/project";
import dynamic from "next/dynamic";
import { useContext } from "react";
import toast from "react-hot-toast";

const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  projectId: string;
  memberId: string;
};

const ProjectActionButtons = ({ projectId, memberId }: Props) => {
  const { socket }: any = useContext(SocketContext);

  const [acceptProjectLeaveRequest, { isLoading: isAccepting }] =
    useAcceptProjectLeaveRequestMutation();
  const [rejectProjectLeaveRequest, { isLoading: isRejecting }] =
    useRejectProjectLeaveRequestMutation();

  const handleAcceptProjectRequest = async () => {
    const result: any = await acceptProjectLeaveRequest({
      projectId: projectId,
      memberId: memberId,
    });
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Leave request has been accepted!"
      );
      socket.emit("notification", memberId);
    } else {
      toast.error(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to accept request!"
      );
    }
  };

  const handleRejectProjectRequest = async () => {
    const result: any = await rejectProjectLeaveRequest({
      projectId: projectId,
      memberId: memberId,
    });
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Request rejected");
      socket.emit("notification", memberId);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to reject request"
      );
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        disabled={isAccepting}
        onClick={handleAcceptProjectRequest}
        type="default"
        className={`${
          isAccepting ? "bg-gray-600 text-white cursor-not-allowed" : ""
        }`}
      >
        {isAccepting ? "Accepting..." : "Accept"}
      </Button>
      <Button
        className={`${
          isRejecting ? "bg-gray-600 text-white cursor-not-allowed" : ""
        }`}
        disabled={isRejecting}
        onClick={handleRejectProjectRequest}
        type="default"
      >
        {isRejecting ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
};

export default ProjectActionButtons;
