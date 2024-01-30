import Projects from "@/components/pages/projects/ProjectPage";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/shared/Loader";

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
  return <div className="py-5">{loading ? <Loader /> : <Projects />}</div>;
};

export default ProjectPage;

ProjectPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
