import { useRouter } from "next/router";
import TeamMembersContainer from "./TeamMembersContainer";
import MemberCard from "./MemberCard";
import TeamCardForDetail from "./TeamCardForDetail";
import ProjectCardForTeamDetail from "./ProjectCardForTeamDetail";
import TeamDetailsSkeleton from "@/components/skeletons/TeamDetailsSkeleton";
import { useGetSingleTeamQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";

const TeamDetails = () => {
  const { query } = useRouter();
  const { data, isLoading } = useGetSingleTeamQuery(query?.teamId as string);
  const team = data?.data as ITeam;

  return (
    <div className="p-5">
      {isLoading ? (
        <TeamDetailsSkeleton />
      ) : (
        <div>
          {/* Team Info */}
          <TeamCardForDetail team={team} />

          {/* Admin Info */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Admin</h3>
            <MemberCard
              member={team.admin}
              memberType="admin"
              teamId={team?.id}
              adminId={team?.admin?.id}
            />
          </div>

          {/* Active Members */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Active Members</h3>
            {team.activeMembers.length > 0 ? (
              <TeamMembersContainer
                members={team.activeMembers}
                memberType="active"
                teamId={team?.id}
                adminId={team?.admin?.id}
              />
            ) : (
              <h2>No members</h2>
            )}
          </div>
          {/* pending Members */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Pending Members</h3>
            {team.pendingMembers.length > 0 ? (
              <TeamMembersContainer
                members={team.pendingMembers}
                memberType="pending"
                teamId={team?.id}
                adminId={team?.admin?.id}
              />
            ) : (
              <h2>No members</h2>
            )}
          </div>

          {/* Projects */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Projects</h3>
            {team?.projects?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {team?.projects?.map((project) => (
                  <ProjectCardForTeamDetail
                    project={project}
                    key={project?.id}
                    team={team}
                  />
                ))}
              </div>
            ) : (
              <h2>No project</h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;
