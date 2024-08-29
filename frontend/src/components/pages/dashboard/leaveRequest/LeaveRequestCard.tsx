import {
  useAcceptProjectLeaveRequestMutation,
  useIgnoreProjectLeaveRequestMutation,
} from "@/features/project";
import {
  useAcceptTeamLeaveRequestMutation,
  useIgnoreTeamLeaveRequestMutation,
} from "@/features/team";
import React from "react";
import Swal from "sweetalert2";

const LeaveRequestCard = ({ data }: any) => {
  const { member, project, team } = data;
  const [acceptProjectLeaveRequest] = useAcceptProjectLeaveRequestMutation();
  const [acceptTeamLeaveRequest] = useAcceptTeamLeaveRequestMutation();
  const [ignoreProjectLeaveRequest] = useIgnoreProjectLeaveRequestMutation();
  const [ignoreTeamLeaveRequest] = useIgnoreTeamLeaveRequestMutation();

  const handleAcceptRequest = async () => {
    if (project) {
      const memberData = {
        projectId: project?.id,
        memberId: member?.id,
      };
      const result: any = await acceptProjectLeaveRequest(memberData);
      if (result?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (result?.error) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: result?.error?.data?.message,
          showConfirmButton: true,
        });
      }
    } else {
      const memberData = {
        teamId: team?.id,
        memberId: member?.id,
      };
      const result: any = await acceptTeamLeaveRequest(memberData);
      if (result?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (result?.error) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: result?.error?.data?.message,
          showConfirmButton: true,
        });
      }
    }
  };

  const handleIgnoreRequest = async () => {
    if (project) {
      const result: any = await ignoreProjectLeaveRequest(data?.id);
      if (result?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (result?.error) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: result?.error?.data?.message,
          showConfirmButton: true,
        });
      }
    } else {
      const result: any = await ignoreTeamLeaveRequest(data?.id);
      if (result?.data?.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: result?.data?.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (result?.error) {
        Swal.fire({
          position: "center",
          icon: "error",
          text: result?.error?.data?.message,
          showConfirmButton: true,
        });
      }
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
