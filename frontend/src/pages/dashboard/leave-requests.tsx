import isAuthenticate from "@/components/HOC/isAuthenticate";
import LeaveRequests from "@/components/pages/dashboard/leaveRequest/LeaveRequests";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const LeaveRequestsPage = () => {
  return (
    <>
      <GetHead
        title="Leave Requests: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <LeaveRequests />
    </>
  );
};

LeaveRequestsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(LeaveRequestsPage);
