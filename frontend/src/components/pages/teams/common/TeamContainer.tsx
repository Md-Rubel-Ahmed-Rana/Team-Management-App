import { ITeam, ITeamCard } from "@/interfaces/team.interface";
import TeamCard from "./TeamCard";
import { IUser } from "@/interfaces/user.interface";

type Props = {
  teams: ITeamCard[];
  admin: IUser;
};

const TeamContainer = ({ teams, admin }: Props) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10 gap-2">
      {teams?.map((team: ITeamCard) => (
        <TeamCard team={team} admin={admin} />
      ))}
    </div>
  );
};

export default TeamContainer;
