import ForgetPasswordPage from "@/components/pages/forgetPassword";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const ForgetPassword: NextPageWithLayout = () => {
  return <ForgetPasswordPage />;
};

export default ForgetPassword;

ForgetPassword.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
