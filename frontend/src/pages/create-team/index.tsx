import isAuthenticate from "@/components/HOC/isAuthenticate";
import CreateTeamPage from "@/components/pages/teams/teamCreation/CreateTeam";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const TeamCreate = () => {
  return (
    <>
      <GetHead
        title="Create Team: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <CreateTeamPage />
    </>
  );
};

TeamCreate.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(TeamCreate);
