import { useLoggedInUserQuery } from "@/features/user";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TeamContainer from "../common/TeamContainer";
import TeamSkeleton from "@/components/skeletons/TeamSkeleton";
import { useGetJoinedTeamsQuery } from "@/features/team";

const JoinedTeamsContainer = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData, isLoading } = useGetJoinedTeamsQuery(user?.id);
  return (
    <section className="p-5">
      <div className="lg:flex justify-between">
        <div>
          <h1 className="lg:text-3xl font-bold">
            Management Your Teams Professionally
          </h1>
          <h1 className="text-lg lg:text-2xl font-semibold mt-2">
            Joined Teams
          </h1>
        </div>
        <div>
          <Link
            href={"/create-team"}
            className="flex items-center mt-3 lg:mt-0 gap-2 bg-blue-600 hover:bg-blue-700 text-white  border px-5 py-2 rounded-md"
          >
            <FaPlus /> <small>Create a team</small>
          </Link>
        </div>
      </div>
      {isLoading ? (
        <TeamSkeleton />
      ) : (
        <TeamContainer teams={teamData?.data || []} />
      )}

      {teamData?.data?.length <= 0 && (
        <div className="text-lg lg:text-2xl font-semibold flex flex-col justify-center items-center gap-4 py-20">
          <h4>You haven&apos; have been joined any teams yet</h4>
          <p>Your joined teams will be displayed here</p>
        </div>
      )}
    </section>
  );
};

export default JoinedTeamsContainer;
