import isAuthenticate from "@/components/HOC/isAuthenticate";
import Payments from "@/components/pages/dashboard/payment";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const PaymentsPage = () => {
  return (
    <>
      <GetHead
        title="Payments: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Payments />
    </>
  );
};

PaymentsPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default isAuthenticate(PaymentsPage);
