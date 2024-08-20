import { useGetTeamDetailsQuery } from "@/features/team";
import { ITeamDetails } from "@/interfaces/team.interface";
import { useRouter } from "next/router";
import TeamMembersContainer from "./TeamMembersContainer";
import MemberCard from "./MemberCard";
import TeamCardForDetail from "./TeamCardForDetail";
import ProjectCardForTeamDetail from "./ProjectCardForTeamDetail";

const TeamDetails = () => {
  const { query } = useRouter();
  const { data, isLoading } = useGetTeamDetailsQuery(query?.teamId as string);
  const team = data?.data as ITeamDetails;

  return (
    <div className="p-5">
      {isLoading ? (
        <div className="text-center mt-10 h-screen">
          <span className="text-lg lg:text-xl bg-blue-500 px-5 py-3 text-white rounded-md font-semibold">
            Loading team details...
          </span>
        </div>
      ) : (
        <div className="bg-white rounded-lg">
          {/* Team Info */}
          <TeamCardForDetail team={team} />

          {/* Admin Info */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Admin</h3>
            <MemberCard member={team.admin} memberType="admin" />
          </div>

          {/* Active Members */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Active Members</h3>
            {team.activeMembers.length > 0 ? (
              <TeamMembersContainer
                members={team.activeMembers}
                memberType="active"
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
                    admin={team.admin}
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
