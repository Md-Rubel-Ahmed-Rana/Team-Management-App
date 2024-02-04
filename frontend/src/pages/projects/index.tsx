import Projects from "@/components/pages/projects/desktop/ProjectPage";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/shared/Loader";
import GetHead from "@/utils/Head";
import ProjectMobileView from "@/components/pages/projects/mobile/project/ProjectMobileView";

const ProjectPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const handleAuth = async () => {
      const isLoggedIn = Cookies.get("tmAccessToken");
      if (!isLoggedIn) {
        setLoading(false);
        return router.push("/login");
      } else {
        setLoading(false);
      }
    };
    handleAuth();
  }, [router]);
  return (
    <div className="py-5">
      <GetHead
        title="Projects: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="hidden lg:block">
            <Projects />
          </div>
          <div className="sm:hidden">
            <ProjectMobileView />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectPage;

ProjectPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
