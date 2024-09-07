import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import LeaveRequestSkeleton from "@/components/skeletons/LeavRequestSkeleton";
import { useGetMyTeamsQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";
import LeaveRequestList from "./LeaveRequestList";

const TeamLeaveRequest = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: requestsData, isLoading } = useGetMyTeamsQuery(user?.id);
  const teams: ITeam[] = requestsData?.data;

  return (
    <div>
      {isLoading ? (
        <LeaveRequestSkeleton />
      ) : (
        <>
          {teams?.length > 0 ? (
            teams?.map((team) => (
              <LeaveRequestList key={team.id} item={team} itemType="team" />
            ))
          ) : (
            <p>No leave requests</p>
          )}
        </>
      )}
    </div>
  );
};

export default TeamLeaveRequest;
