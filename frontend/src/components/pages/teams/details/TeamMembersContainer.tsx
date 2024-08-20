import { ITeamDetailsMember } from "@/interfaces/team.interface";
import MemberCard from "./MemberCard";

type IMembers = {
  members: ITeamDetailsMember[];
  memberType: string;
};

const TeamMembersContainer = ({ members, memberType }: IMembers) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <MemberCard member={member} key={member.id} memberType={memberType} />
      ))}
    </div>
  );
};

export default TeamMembersContainer;
