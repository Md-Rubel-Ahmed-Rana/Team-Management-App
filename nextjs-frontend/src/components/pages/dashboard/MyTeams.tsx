import React, { useState } from "react";
import TeamDetails from "./TeamDetails";
import { useLoggedInUserQuery } from "@/features/user";
import { useMyTeamsQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";
import CreateTeamModal from "../teams/teamCreation/CreateTeam";

const MyTeams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useMyTeamsQuery(user?._id);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col  gap-5 p-4">
      <div className="mt-4">
        <button
          onClick={() => setIsOpen(true)}
          className="border px-4 py-2 rounded-md"
        >
          Create New Team
        </button>
        {teamData?.data?.length <= 0 && (
          <h4 className="text-xl font-semibold mt-4">
            You haven&apos; create team yet.
          </h4>
        )}
      </div>
      {teamData?.data?.map((team: ITeam) => (
        <TeamDetails key={team?._id} team={team} />
      ))}

      {isOpen && <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default MyTeams;
