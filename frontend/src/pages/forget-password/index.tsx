import ForgetPasswordPage from "@/components/pages/forgetPassword";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const ForgetPassword: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="Forget Password: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <ForgetPasswordPage />;
    </>
  );
};

export default ForgetPassword;

ForgetPassword.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
