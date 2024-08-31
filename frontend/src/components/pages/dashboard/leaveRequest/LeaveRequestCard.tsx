import { SocketContext } from "@/context/SocketContext";
import {
  useAcceptProjectLeaveRequestMutation,
  useIgnoreProjectLeaveRequestMutation,
} from "@/features/project";
import {
  useAcceptTeamLeaveRequestMutation,
  useIgnoreTeamLeaveRequestMutation,
} from "@/features/team";
import React, { useContext } from "react";
import toast from "react-hot-toast";

const LeaveRequestCard = ({ data }: any) => {
  const { socket }: any = useContext(SocketContext);
  const { member, project, team } = data;
  const [acceptProjectLeaveRequest] = useAcceptProjectLeaveRequestMutation();
  const [acceptTeamLeaveRequest] = useAcceptTeamLeaveRequestMutation();
  const [ignoreProjectLeaveRequest] = useIgnoreProjectLeaveRequestMutation();
  const [ignoreTeamLeaveRequest] = useIgnoreTeamLeaveRequestMutation();

  const handleAcceptRequest = async () => {
    if (project) {
      handleAcceptProjectRequest({
        projectId: project?.id,
        memberId: member?.id,
      });
    } else {
      handleAcceptTeamRequest({ teamId: team?.id, memberId: member?.id });
    }
  };

  const handleAcceptProjectRequest = async (data: {
    projectId: string;
    memberId: string;
  }) => {
    const result: any = await acceptProjectLeaveRequest(data);
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Leave request has been accepted!"
      );
      socket.emit("notification", data?.memberId);
    } else {
      toast.error(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to accept request!"
      );
    }
  };

  const handleAcceptTeamRequest = async (data: {
    teamId: string;
    memberId: string;
  }) => {
    const result: any = await acceptTeamLeaveRequest(data);
    if (result?.data?.success) {
      toast.success(
        result?.data?.message || "Leave request has been accepted!"
      );
      socket.emit("notification", data?.memberId);
    } else {
      toast.error(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to accept request!"
      );
    }
  };

  const handleIgnoreRequest = async () => {
    if (project) {
      handleIgnoreProjectRequest();
    } else {
      handleIgnoreTeamRequest();
    }
  };

  const handleIgnoreProjectRequest = async () => {
    const result: any = await ignoreProjectLeaveRequest(data?.id);
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Request ignored");
      socket.emit("notification", member?.id);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to ignore request"
      );
    }
  };

  const handleIgnoreTeamRequest = async () => {
    const result: any = await ignoreTeamLeaveRequest(data?.id);
    if (result?.data?.success) {
      toast.success(result?.data?.message || "Request ignored");
      socket.emit("notification", member?.id);
    } else {
      toast.success(
        result?.data?.message ||
          result?.error?.data?.message ||
          "Failed to ignore request"
      );
    }
  };

  return (
    <div className="p-5 border flex flex-col gap-3 w-full">
      <h4 className="text-sm lg:text-md">
        Name: {project?.name || team?.name}
      </h4>
      <h5 className="text-sm">Member: {member?.name}</h5>
      <div className="flex space-x-4">
        <button
          onClick={handleIgnoreRequest}
          className="text-xs py-1 px-2 lg:px-4 rounded focus:outline-none border w-full lg:w-auto bg-blue-500 text-white"
        >
          Ignore
        </button>
        <button
          onClick={handleAcceptRequest}
          className="text-xs py-1 px-2 lg:px-4 rounded focus:outline-none border w-full lg:w-auto bg-blue-500 text-white"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
