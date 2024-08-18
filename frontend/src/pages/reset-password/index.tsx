import ResetPasswordPage from "@/components/pages/resetPassword";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const ResetPassword: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="Reset Password: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <ResetPasswordPage />;
    </>
  );
};

export default ResetPassword;

ResetPassword.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
