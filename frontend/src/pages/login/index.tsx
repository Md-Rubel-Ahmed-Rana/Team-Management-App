import Login from "@/components/pages/login/Login";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";

const LoginPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleAuth = async () => {
      setLoading(true);
      const isLoggedIn = Cookies.get("tmAccessToken");
      if (isLoggedIn) {
        setLoading(false);
        return router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };
    handleAuth();
  }, [router]);
  return <div>{loading ? <Loader /> : <Login />}</div>;
};

export default LoginPage;

LoginPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
