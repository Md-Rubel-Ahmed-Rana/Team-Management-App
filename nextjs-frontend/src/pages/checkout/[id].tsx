import CheckoutPage from "@/components/pages/checkout/Checkout";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Loader from "@/components/shared/Loader";

const CheckoutRoute: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setLoading(true);
    const handleAuth = async () => {
      const isLoggedIn = Cookies.get("tmAccessToken");
      if (!isLoggedIn) {
        setLoading(false);
        return router.push("/login");
      }
    };
    handleAuth();
  }, [router]);
  return <div>{loading ? <Loader /> : <CheckoutPage />}</div>;
};

export default CheckoutRoute;

CheckoutRoute.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
