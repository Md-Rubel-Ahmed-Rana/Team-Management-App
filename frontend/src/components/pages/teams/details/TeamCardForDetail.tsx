import { FaFacebookMessenger } from "react-icons/fa";
import Link from "next/link";
import { ITeam } from "@/interfaces/team.interface";
import TeamActions from "../common/TeamActions";

type Props = {
  team: ITeam;
};

const TeamCardForDetail = ({ team }: Props) => {
  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-4 lg:justify-start items-center">
        <div className="w-24 h-24 lg:mr-6">
          <img
            src={team?.image}
            alt={`${team?.name}-logo`}
            className="rounded-full ring-2 w-24 h-24"
          />
        </div>
        <div>
          <div className="flex lg:inline-flex  flex-col-reverse lg:flex-row items-center gap-2 relative">
            <h2 className="text-start  w-full mb-2 text-2xl font-bold">
              {team?.name}
            </h2>
            <div className="flex items-center gap-3">
              <TeamActions team={team} />
              <Link
                href={`/teams/messages/${team?.id}?team_name=${team?.name}&team_category=${team?.category}&team_description=${team?.description}`}
              >
                <FaFacebookMessenger className="text-3xl text-blue-500" />
              </Link>
            </div>
          </div>

          <p className="text-sm text-gray-600">{team?.category}</p>
          <p className="text-gray-800 mt-2">{team?.description}</p>
        </div>
      </div>
    </>
  );
};

export default TeamCardForDetail;
