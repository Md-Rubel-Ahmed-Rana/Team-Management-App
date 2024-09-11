import { SocketContext } from "@/context/SocketContext";
import {
  useAcceptInvitationMutation,
  useRejectInvitationMutation,
} from "@/features/invitation";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import dynamic from "next/dynamic";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  teamId: string;
  adminId: string;
};

const InviteActions = ({ teamId, adminId }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const { data: userData }: any = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [acceptInvitation, { isLoading: isAccepting }] =
    useAcceptInvitationMutation();
  const [rejectInvitation, { isLoading: isRejecting }] =
    useRejectInvitationMutation();
  const handleAcceptInvitation = async () => {
    const result: any = await acceptInvitation({
      teamId,
      memberId: user?.id,
    });
    if (result?.data?.success) {
      socket.emit("notification", adminId);
      toast.success("Invitation has been accepted successfully!");
    } else {
      toast.error("Failed accept invitation!");
    }
  };

  const handleRejectInvitation = async () => {
    const result: any = await rejectInvitation({
      teamId,
      memberId: user?.id,
    });
    if (result?.data?.success) {
      // send notification viw socket
      socket.emit("notification", adminId);
      toast.success("Invitation has been accepted successfully!");
    } else {
      toast.error("Failed accept invitation!");
    }
  };
  return (
    <div className="flex  items-center justify-between gap-3 mx-2">
      <Button
        type="primary"
        disabled={isAccepting || isRejecting}
        onClick={handleAcceptInvitation}
        className={`px-5 py-2 rounded-md w-full text-white border ${
          isAccepting || isRejecting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600"
        }`}
      >
        {isAccepting ? "Accepting..." : "Accept"}
      </Button>
      <Button
        type="primary"
        disabled={isAccepting || isRejecting}
        onClick={handleRejectInvitation}
        className={`px-5 py-2 rounded-md border text-white w-full ${
          isAccepting || isRejecting
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600"
        }`}
      >
        {isRejecting ? "Rejecting..." : "Reject"}
      </Button>
    </div>
  );
};

export default InviteActions;
