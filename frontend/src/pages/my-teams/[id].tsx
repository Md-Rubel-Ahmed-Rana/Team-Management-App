import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";
import MyTeams from "@/components/pages/teams/my-teams";

const TeamDetails: NextPageWithLayout = () => {
  return (
    <div className="lg:py-5">
      <GetHead
        title="Team Collaboration: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <MyTeams />
    </div>
  );
};

export default TeamDetails;

TeamDetails.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
