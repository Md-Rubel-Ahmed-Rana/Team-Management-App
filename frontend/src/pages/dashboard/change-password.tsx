import isAuthenticate from "@/components/HOC/isAuthenticate";
import ChangePassword from "@/components/pages/dashboard/changePassword";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const ChangePasswordPage = () => {
  return (
    <>
      <GetHead
        title="Change Password: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <ChangePassword />
    </>
  );
};

ChangePasswordPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(ChangePasswordPage);
