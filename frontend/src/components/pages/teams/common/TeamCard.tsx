import { ITeam } from "@/interfaces/team.interface";
import Link from "next/link";
import TeamActions from "./TeamActions";

type Props = {
  team: ITeam;
};

const TeamCard = ({ team }: Props) => {
  return (
    <>
      <div className="border p-5 rounded-md border-blue-400 flex flex-col justify-between gap-1">
        <div className="flex justify-between items-start relative">
          <img
            className="w-24 h-24 rounded-full border-2"
            src={team?.image}
            alt={team?.name}
          />
          <TeamActions team={team} />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold">{team?.name}</h2>
        <h4 className="text-lg lg:text-xl font-medium">{team?.category}</h4>
        <h4>Active Members: {team.activeMembers.length} </h4>
        <h4>Pending Members: {team.pendingMembers.length} </h4>
        <h4>Projects: {team.projects.length} </h4>
        <p className="text-gray-600">{team?.description}</p>
        <div className="flex justify-between gap-2 lg:gap-4 mt-2">
          <Link
            href={`/teams/details/${team.id}?team_name=${team.name}&team_category=${team.category}&team_description=${team.description}`}
            className="bg-blue-500 rounded-md w-full text-center text-white py-2 hover:bg-blue-600 transition"
          >
            Details
          </Link>
          <Link
            href={`/teams/messages/${team.id}?team_name=${team.name}&team_category=${team.category}&team_description=${team.description}`}
            className="bg-blue-500 rounded-md w-full text-center text-white py-2 hover:bg-blue-600 transition"
          >
            Messages
          </Link>
        </div>
      </div>
    </>
  );
};

export default TeamCard;
