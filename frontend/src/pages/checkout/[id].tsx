import CheckoutPage from "@/components/pages/checkout/Checkout";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const CheckoutRoute: NextPageWithLayout = () => {
  return <CheckoutPage />;
};

export default CheckoutRoute;

CheckoutRoute.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
