import React, { useState } from "react";
import TeamDetails from "./TeamDetails";
import { useLoggedInUserQuery } from "@/features/user";
import { useMyTeamsQuery } from "@/features/team";
import { ITeam } from "@/interfaces/team.interface";
import Link from "next/link";

const MyTeams = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user = userData?.data;
  const { data: teamData } = useMyTeamsQuery(user?.id);

  return (
    <div className="flex flex-col  gap-5 p-4">
      <div className="mt-4">
        <Link href={"/create-team"} className="border px-4 py-2 rounded-md">
          Create New Team
        </Link>
        {teamData?.data?.length <= 0 && (
          <h4 className="text-xl font-semibold mt-4">
            You haven&apos; create team yet.
          </h4>
        )}
      </div>
      {teamData?.data?.map((team: ITeam) => (
        <TeamDetails key={team?.id} team={team} />
      ))}
    </div>
  );
};

export default MyTeams;
