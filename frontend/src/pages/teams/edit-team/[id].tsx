import isAuthenticate from "@/components/HOC/isAuthenticate";
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
      <div className="max-w-[1280px] w-full mx-auto">
        <TeamEditPage />
      </div>
    </>
  );
};

EditTeam.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(EditTeam);
