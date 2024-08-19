import TasksForDesktopView from "@/components/pages/tasks/desktop";
import TasksForMobileView from "@/components/pages/tasks/mobile";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

const TasksPage = () => {
  const { query } = useRouter();
  return (
    <div>
      <GetHead
        title={`Tasks - ${query?.project_name || "Project"}: Team Manager`}
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />

      <div>
        <div className="hidden md:block">
          <TasksForDesktopView />
        </div>
        <div className="block  md:hidden">
          <TasksForMobileView />
        </div>
      </div>
    </div>
  );
};

export default TasksPage;

TasksPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
