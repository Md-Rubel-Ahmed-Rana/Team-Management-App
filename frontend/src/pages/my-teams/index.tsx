import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";
import MyTeams from "@/components/pages/teams/my-teams";
import isAuthenticate from "@/components/HOC/isAuthenticate";

const TeamPage: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="My Teams: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="max-w-[1280px] w-full mx-auto">
        <MyTeams />
      </div>
    </>
  );
};

TeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(TeamPage);
