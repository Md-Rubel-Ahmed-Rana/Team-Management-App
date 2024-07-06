import TeamDetailsPage from "@/components/pages/teams/showTeam/TeamDetailsPage";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import GetHead from "@/utils/Head";
import TeamDetailsMobilePage from "@/components/pages/teams/mobile";

const TeamDetails: NextPageWithLayout = () => {
  return (
    <div className="py-5">
      <GetHead
        title="Team Collaboration: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div>
        <div className="hidden lg:block">
          <TeamDetailsPage />
        </div>
        <div className="md:hidden">
          <TeamDetailsMobilePage />
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;

TeamDetails.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
