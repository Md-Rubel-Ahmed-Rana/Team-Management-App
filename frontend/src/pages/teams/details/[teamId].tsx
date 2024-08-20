import TeamDetails from "@/components/pages/teams/details";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const TeamDetailsPage = () => {
  const { query } = useRouter();
  return (
    <>
      <GetHead
        title={`Team Details - ${query?.team_name || "Team"}: Team Manager`}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <TeamDetails />
    </>
  );
};

export default TeamDetailsPage;

TeamDetailsPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
