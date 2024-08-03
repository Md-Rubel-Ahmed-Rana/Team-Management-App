import Login from "@/components/pages/login/Login";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const LoginPage: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="Login: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Login />;
    </>
  );
};

export default LoginPage;

LoginPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
