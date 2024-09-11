import { PackageDetail } from "@/interfaces/package.interface";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { useLoggedInUserQuery } from "@/features/user";
import { useGetMyTeamsQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";
import { useMyProjectsQuery } from "@/features/project";
import { IProject } from "@/interfaces/project.interface";

const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  pkg: PackageDetail;
};

const ValidityCard = ({ pkg }: Props) => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useGetMyTeamsQuery(user?.id);
  const { data: myProjects } = useMyProjectsQuery(user?.id);
  const projects = myProjects?.data as IProject[];
  const teams = teamData?.data as ITeam[];
  const startDate = dayjs(pkg?.start);
  const endDate = dayjs(pkg?.end);
  const remainingDays = endDate.diff(dayjs(), "day");

  // Total allowed members (team limit * member limit per team)
  const totalMember =
    pkg?.limit?.team?.memberCount * pkg?.limit?.team?.teamCount;

  // Calculate the total number of active members across all teams
  const totalActiveMember =
    teams?.reduce((acc, team) => acc + team?.activeMembers?.length, 0) || 0;

  return (
    <div className="p-5 w-full flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold mb-2">Validity</h3>
        <p>
          Teams: {pkg?.limit?.team?.teamCount} {`(${teams?.length} created)`}{" "}
        </p>
        <p>
          Members: {totalMember} {`(${totalActiveMember} added)`}{" "}
        </p>
        <p>
          Projects: {pkg?.limit?.projectCount} {`(${projects?.length} created)`}
        </p>
        <p>Plan starts: {startDate.format("MMMM D, YYYY")}</p>
        <p>Plan ends: {endDate.format("MMMM D, YYYY")}</p>
        <p>
          Remaining: {remainingDays > 0 ? `${remainingDays} days` : "Expired"}
        </p>
      </div>
      <Button
        type="primary"
        className={`px-5 py-2 rounded-md w-full text-white bg-blue-600`}
      >
        Renew Now
      </Button>
    </div>
  );
};

export default ValidityCard;
