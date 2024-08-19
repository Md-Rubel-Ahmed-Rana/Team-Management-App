import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";
import ProjectsContainer from "@/components/pages/projects";

const ProjectPage: NextPageWithLayout = () => {
  return (
    <div className="py-5">
      <GetHead
        title="Projects: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <ProjectsContainer />
    </div>
  );
};

export default ProjectPage;

ProjectPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
