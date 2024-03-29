import React, { useState } from "react";
import TeamDetails from "./TeamDetails";
import { useLoggedInUserQuery } from "@/features/user";
import { useJoinedTeamsQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";

const JoinedTeams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useJoinedTeamsQuery(user?.id);

  return (
    <div>
      {teamData?.data?.length > 0 && (
        <div className="flex flex-col  gap-5 p-4">
          {teamData?.data?.map((team: ITeam) => (
            <TeamDetails key={team?.id} team={team} />
          ))}
        </div>
      )}
      {teamData?.data?.length <= 0 && (
        <div className="h-screen flex justify-center items-center">
          <h3 className="text-3xl font-semibold">
            You have&apos; joined to any team.
          </h3>
        </div>
      )}
    </div>
  );
};

export default JoinedTeams;
