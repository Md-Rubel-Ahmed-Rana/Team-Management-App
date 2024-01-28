import CheckoutPage from "@/components/pages/checkout/Checkout";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const CheckoutRoute: NextPageWithLayout = () => {
  return (
    <div>
      <CheckoutPage />
    </div>
  );
};

export default CheckoutRoute;

CheckoutRoute.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
