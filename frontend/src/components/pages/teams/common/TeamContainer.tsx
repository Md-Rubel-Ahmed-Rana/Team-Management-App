import { ITeam } from "@/interfaces/team.interface";
import TeamCard from "./TeamCard";

type Props = {
  teams: ITeam[];
};

const TeamContainer = ({ teams }: Props) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10 gap-2">
      {teams?.map((team: ITeam) => (
        <TeamCard team={team} key={team.id} />
      ))}
    </div>
  );
};

export default TeamContainer;
