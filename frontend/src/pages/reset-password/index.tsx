import ResetPasswordPage from "@/components/pages/resetPassword";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const ResetPassword: NextPageWithLayout = () => {
  return <ResetPasswordPage />;
};

export default ResetPassword;

ResetPassword.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
