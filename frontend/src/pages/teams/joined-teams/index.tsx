import isAuthenticate from "@/components/HOC/isAuthenticate";
import { JoinedTeamsContainer } from "@/components/pages/teams";
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
      <div className="max-w-[1280px] w-full mx-auto">
        <JoinedTeamsContainer />
      </div>
    </>
  );
};

JoinedTeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(JoinedTeamPage);
