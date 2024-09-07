import { SocketContext } from "@/context/SocketContext";
import {
  useAcceptTeamLeaveRequestMutation,
  useRejectTeamLeaveRequestMutation,
} from "@/features/team";
import dynamic from "next/dynamic";
import { useContext } from "react";
import toast from "react-hot-toast";

const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  teamId: string;
  memberId: string;
};

const TeamActionButtons = ({ teamId, memberId }: Props) => {
  const { socket }: any = useContext(SocketContext);

  const [acceptTeamLeaveRequest, { isLoading: isAccepting }] =
    useAcceptTeamLeaveRequestMutation();
  const [rejectTeamLeaveRequest, { isLoading: isRejecting }] =
    useRejectTeamLeaveRequestMutation();

  const handleAcceptRequest = async () => {
    const result: any = await acceptTeamLeaveRequest({
      teamId: teamId,
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

  const handleRejectRequest = async () => {
    const result: any = await rejectTeamLeaveRequest({
      teamId: teamId,
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
        onClick={handleAcceptRequest}
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
        onClick={handleRejectRequest}
        type="default"
      >
        {isRejecting ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
};

export default TeamActionButtons;
