import TeamDetailsPage from "@/components/pages/teams/showTeam/TeamDetailsPage";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";

const TeamDetails: NextPageWithLayout = () => {
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
  return (
    <div className="py-5">{loading ? <Loader /> : <TeamDetailsPage />}</div>
  );
};

export default TeamDetails;

TeamDetails.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
