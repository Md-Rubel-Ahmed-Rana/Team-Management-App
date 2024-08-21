import Profile from "@/components/pages/Profile";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const ProfilePage = () => {
  return (
    <div>
      <GetHead
        title="Profile: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Profile />
    </div>
  );
};

export default ProfilePage;

ProfilePage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};
