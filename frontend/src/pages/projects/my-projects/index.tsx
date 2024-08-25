import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";
import isAuthenticate from "@/components/HOC/isAuthenticate";
import { MyProjectsContainer } from "@/components/pages/projects";

const MyProjectPage: NextPageWithLayout = () => {
  return (
    <div className="py-5">
      <GetHead
        title="My Projects: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="max-w-[1280px] w-full mx-auto">
        <MyProjectsContainer />
      </div>
    </div>
  );
};

MyProjectPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(MyProjectPage);
