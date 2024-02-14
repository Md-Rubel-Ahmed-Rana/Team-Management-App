import TeamEditPage from "@/components/pages/teams/editTeam";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const EditTeam: NextPageWithLayout = () => {
  return (
    <div>
      <TeamEditPage />
    </div>
  );
};

export default EditTeam;

EditTeam.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
