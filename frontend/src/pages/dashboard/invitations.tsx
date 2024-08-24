import isAuthenticate from "@/components/HOC/isAuthenticate";
import PendingInvitation from "@/components/pages/dashboard/invitation/PendingInvitation";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const InvitationsPage = () => {
  return (
    <>
      <GetHead
        title="Invitations: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <PendingInvitation />
    </>
  );
};

InvitationsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(InvitationsPage);
