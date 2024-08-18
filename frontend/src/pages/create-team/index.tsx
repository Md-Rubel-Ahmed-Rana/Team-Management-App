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

export default TeamCreate;

TeamCreate.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
