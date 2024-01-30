import Teams from "@/components/pages/teams/showTeam/TeamPage";
import RootLayout from "@/layout/RootLayout";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "@/components/shared/Loader";

const TeamPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const handleAuth = async () => {
      setLoading(true);
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
  return <div>{loading ? <Loader /> : <Teams />}</div>;
};

export default TeamPage;

TeamPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
