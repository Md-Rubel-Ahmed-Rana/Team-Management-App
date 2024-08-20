import { ITeam } from "@/interfaces/team.interface";
import TeamCard from "./TeamCard";
import { IUser } from "@/interfaces/user.interface";

type Props = {
  teams: ITeam[];
  admin: IUser;
};

const TeamContainer = ({ teams, admin }: Props) => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 py-10 gap-2">
      {teams?.map((team: ITeam) => (
        <TeamCard team={team} admin={admin} />
      ))}
    </div>
  );
};

export default TeamContainer;
