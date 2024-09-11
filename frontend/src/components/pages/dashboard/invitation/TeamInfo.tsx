import { ITeam } from "@/interfaces/team.interface";
import React from "react";

type Props = {
  team: ITeam;
};

const TeamInfo = ({ team }: Props) => {
  return (
    <div className="mb-3">
      <h2 className="text-xl font-semibold">{team?.name}</h2>
      <h5>{team.category}</h5>
      <h5>{team.description}</h5>
    </div>
  );
};

export default TeamInfo;
