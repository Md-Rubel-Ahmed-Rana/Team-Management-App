import TeamDetailsPage from "@/components/pages/teams/showTeam/TeamDetailsPage";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";

const TeamDetails: NextPageWithLayout = () => {
  return (
    <div className="lg:py-5">
      <GetHead
        title="Team Collaboration: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <TeamDetailsPage />
    </div>
  );
};

export default TeamDetails;

TeamDetails.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
