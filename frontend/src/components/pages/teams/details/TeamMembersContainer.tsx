import { IUser } from "@/interfaces/user.interface";
import MemberCard from "./MemberCard";

type IMembers = {
  members: IUser[];
  memberType: string;
  teamId: string;
  adminId: string;
};

const TeamMembersContainer = ({
  members,
  memberType,
  teamId,
  adminId,
}: IMembers) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {members.map((member) => (
        <MemberCard
          member={member}
          key={member.id}
          memberType={memberType}
          teamId={teamId}
          adminId={adminId}
        />
      ))}
    </div>
  );
};

export default TeamMembersContainer;
