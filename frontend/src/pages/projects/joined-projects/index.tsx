import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";
import isAuthenticate from "@/components/HOC/isAuthenticate";
import { JoinedProjectsContainer } from "@/components/pages/projects";

const JoinedProjectPage: NextPageWithLayout = () => {
  return (
    <div className="py-5">
      <GetHead
        title="Joined Projects: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="max-w-[1280px] w-full mx-auto">
        <JoinedProjectsContainer />
      </div>
    </div>
  );
};

JoinedProjectPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(JoinedProjectPage);
