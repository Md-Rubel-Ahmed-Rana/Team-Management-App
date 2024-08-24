import isAuthenticate from "@/components/HOC/isAuthenticate";
import TasksForDesktopView from "@/components/pages/tasks/desktop";
import TasksForMobileView from "@/components/pages/tasks/mobile";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const TasksPage = () => {
  const { query } = useRouter();
  return (
    <>
      <GetHead
        title={`Tasks - ${query?.project_name || "Project"}: Team Manager`}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="max-w-[1280px] w-full mx-auto py-5 max-h-screen h-full">
        <div className="hidden md:block">
          <TasksForDesktopView />
        </div>
        <div className="block  md:hidden">
          <TasksForMobileView />
        </div>
      </div>
    </>
  );
};

TasksPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default isAuthenticate(TasksPage);
