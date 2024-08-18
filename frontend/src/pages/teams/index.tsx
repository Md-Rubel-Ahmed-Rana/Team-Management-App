import Teams from "@/components/pages/teams/showTeam/TeamPage";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";

const TeamPage: NextPageWithLayout = () => {
  return (
    <div>
      <GetHead
        title="Teams: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Teams />
    </div>
  );
};

export default TeamPage;

TeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
