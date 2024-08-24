import isAuthenticate from "@/components/HOC/isAuthenticate";
import CheckoutPage from "@/components/pages/checkout/Checkout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const CheckoutRoute: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="Checkout: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <CheckoutPage />;
    </>
  );
};

CheckoutRoute.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(CheckoutRoute);
