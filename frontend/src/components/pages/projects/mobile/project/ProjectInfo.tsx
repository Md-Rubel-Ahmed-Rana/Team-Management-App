import { IProject } from "@/interfaces/project.interface";
import React, { useState } from "react";
import AddMemberToProject from "../../desktop/AddMemberToProject";
import RemoveMemberFromProject from "../../desktop/RemoveMemberFromProject";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import Swal from "sweetalert2";
import {
  useGetMemberLeaveProjectRequestQuery,
  useLeaveProjectRequestMutation,
} from "@/features/project";

type Props = {
  project: IProject;
};

const ProjectInfo = ({ project }: Props) => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [leaveRequest] = useLeaveProjectRequestMutation();
  const { data: memberLeaveRequest } = useGetMemberLeaveProjectRequestQuery(
    user?._id
  );

  const handleLeaveRequest = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to leave from this project",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yeas",
    }).then((result) => {
      if (result?.isConfirmed) {
        const leaveData = {
          project: project?._id,
          member: user?._id,
          admin: project?.user,
        };
        const leaveHandler = async () => {
          const result: any = await leaveRequest(leaveData);
          if (result?.data?.success) {
            Swal.fire("Done!", `${result?.data?.message}`, "success");
          }
          if (result?.error) {
            Swal.fire("Done!", `${result?.error?.data?.message}`, "error");
          }
        };
        leaveHandler();
      }
    });
  };
  return (
    <div className="border shadow-md p-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Project: {project?.name}</h3>
        <h5 className="font-light text-sm">Team: {project?.team?.name}</h5>
        <h6 className="font-light text-sm">Category: {project?.category}</h6>
      </div>
      <hr className="my-2" />
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-lg">
          Total Member: {project?.members?.length}{" "}
        </h4>
        {project?.user === user?._id && (
          <div className="flex items-center justify-between">
            <p>
              <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-200 dark:bg-gray-600 px-4 py-1 rounded-md"
              >
                Add Member
              </button>
            </p>
            <p>
              <button
                onClick={() => setIsRemove(true)}
                className="bg-gray-200 dark:bg-gray-600 px-4 py-1 rounded-md"
              >
                Remove Member
              </button>
            </p>
          </div>
        )}
        {project?.user !== user?._id && (
          <button
            onClick={handleLeaveRequest}
            disabled={memberLeaveRequest?.data?.project === project?._id}
            className={` ${
              memberLeaveRequest?.data?.project === project?._id
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700"
            } text-white px-4 py-1 rounded-md`}
          >
            {memberLeaveRequest?.data?.project === project?._id
              ? "Requested"
              : "Request to leave"}
          </button>
        )}
      </div>
      {isOpen && (
        <AddMemberToProject
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          projectId={project?._id}
          team={project?.team}
        />
      )}
      {isRemove && (
        <RemoveMemberFromProject
          isRemove={isRemove}
          setIsRemove={setIsRemove}
          projectId={project?._id}
          team={project?.team}
        />
      )}
    </div>
  );
};

export default ProjectInfo;
