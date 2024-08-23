import JoinedTeams from "@/components/pages/teams/joined-teams";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const JoinedTeamPage = () => {
  return (
    <>
      <GetHead
        title="Joined Teams: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <JoinedTeams />
    </>
  );
};

export default JoinedTeamPage;

JoinedTeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};