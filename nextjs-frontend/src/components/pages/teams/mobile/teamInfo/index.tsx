import React from "react";
import TeamMemberTable from "../../teamMemberTable";
import { ITeam } from "@/interfaces/team.interface";

type Props = {
  team: ITeam;
};

const TeamInfo = ({ team }: Props) => {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{team?.name}</h3>
        <h5 className="text-lg font-sans">{team?.category}</h5>
        <p className="text-sm font-light">{team?.description}</p>
      </div>
      <TeamMemberTable team={team} />
    </div>
  );
};

export default TeamInfo;
