import isAuthenticate from "@/components/HOC/isAuthenticate";
import Profile from "@/components/pages/Profile";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const ProfilePage = () => {
  return (
    <>
      <GetHead
        title="Profile: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Profile />
    </>
  );
};

ProfilePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(ProfilePage);
