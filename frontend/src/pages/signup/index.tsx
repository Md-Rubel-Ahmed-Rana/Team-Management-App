import Signup from "@/components/pages/Signup/Signup";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const SignupPage: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="Sign up: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Signup />;
    </>
  );
};

export default SignupPage;

SignupPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
