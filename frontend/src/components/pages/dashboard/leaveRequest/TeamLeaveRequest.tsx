import { useGetLeaveTeamRequestsByAdminQuery } from "@/features/team";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import LeaveRequestCard from "./LeaveRequestCard";
import LeaveRequestSkeleton from "@/components/skeletons/LeavRequestSkeleton";

const TeamLeaveRequest = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: requestsData, isLoading } = useGetLeaveTeamRequestsByAdminQuery(
    user?.id
  );
  const requests: [] = requestsData?.data;

  return (
    <div>
      {isLoading ? (
        <LeaveRequestSkeleton />
      ) : (
        <>
          {requests?.length > 0 &&
            requests?.map((request: any) => (
              <LeaveRequestCard key={request?.id} data={request} />
            ))}
        </>
      )}
    </div>
  );
};

export default TeamLeaveRequest;
