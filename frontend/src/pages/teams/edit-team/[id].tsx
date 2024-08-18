import TeamEditPage from "@/components/pages/teams/editTeam";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const EditTeam: NextPageWithLayout = () => {
  const { query } = useRouter();
  return (
    <>
      <GetHead
        title={`${query?.name || "Edit Team"}: Team Manager`}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <TeamEditPage />
    </>
  );
};

export default EditTeam;

EditTeam.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
