import Signup from "@/components/pages/Signup/Signup";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";

const SignupPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const handleAuth = async () => {
      setLoading(true);
      const isLoggedIn = Cookies.get("tmAccessToken");
      if (isLoggedIn !== "undefined") {
        setLoading(false);
        return router.push("/dashboard");
      } else {
        setLoading(false);
      }
    };
    handleAuth();
  }, [router]);
  return <div>{loading ? <Loader /> : <Signup />}</div>;
};

export default SignupPage;

SignupPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
