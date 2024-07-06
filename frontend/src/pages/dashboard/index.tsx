import Dashboard from "@/components/pages/dashboard";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";
import GetHead from "@/utils/Head";

const DashboardPage: NextPageWithLayout = () => {
  return (
    <div className="py-5">
      <GetHead
        title="Dashboard: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <Dashboard />
    </div>
  );
};

export default DashboardPage;

DashboardPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
