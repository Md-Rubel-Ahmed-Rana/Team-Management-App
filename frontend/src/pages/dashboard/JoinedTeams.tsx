import React, { useState } from "react";
import { ITeam } from "../../interfaces/team.interface";
import TeamDetails from "./TeamDetails";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { useJoinedTeamsQuery } from "../../features/team/teamApi";

const JoinedTeams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useJoinedTeamsQuery(user?._id);

  return (
    <div className="flex flex-col  gap-5 p-4">
      {teamData?.data.map((team: ITeam) => (
        <TeamDetails key={team._id} team={team} />
      ))}
    </div>
  );
};

export default JoinedTeams;
