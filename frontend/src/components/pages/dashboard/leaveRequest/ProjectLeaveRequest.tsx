import { useGetLeaveProjectRequestsByAdminQuery } from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import LeaveRequestCard from "./LeaveRequestCard";

const ProjectLeaveRequest = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: requestsData } = useGetLeaveProjectRequestsByAdminQuery(
    user?.id
  );
  const requests = requestsData?.data;

  return (
    <div>
      {requests?.length > 0 &&
        requests?.map((request: any) => (
          <LeaveRequestCard key={request?.id} data={request} />
        ))}
    </div>
  );
};

export default ProjectLeaveRequest;
