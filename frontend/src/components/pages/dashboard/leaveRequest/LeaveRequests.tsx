import React, { useEffect, useState } from "react";
import TeamLeaveRequest from "./TeamLeaveRequest";
import ProjectLeaveRequest from "./ProjectLeaveRequest";
import { useRouter } from "next/router";

const LeaveRequests = () => {
  const router = useRouter();
  const [sortCategory, setSortCategory] = useState<any>("Project");
  const handleChangeSortCategory = (category: string) => {
    setSortCategory(category);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sortCategory: category },
    });
  };

  useEffect(() => {
    setSortCategory(router?.query?.sortCategory);
  }, [router?.query?.sortCategory]);

  return (
    <div className="w-[76vw]">
      <div className="w-full flex lg:flex-row flex-col gap-4 justify-between items-center lg:px-0 px-4 lg:mt-0 mt-5">
        <h3 className="text-lg lg:text-2xl">
          Your member requests to leave from team and project
        </h3>
        <div className="flex items-center gap-2 w-full lg:w-auto">
          <button
            className={`${
              sortCategory === "Project" && "bg-blue-600 text-white"
            } py-1 lg:py-2 px-2 lg:px-4 rounded focus:outline-none border w-full lg:w-auto `}
            onClick={() => handleChangeSortCategory("Project")}
          >
            Project
          </button>
          <button
            className={`${
              sortCategory === "Team" && "bg-blue-600 text-white"
            } py-1 lg:py-2 px-2 lg:px-4 rounded focus:outline-none border w-full lg:w-auto`}
            onClick={() => handleChangeSortCategory("Team")}
          >
            Team
          </button>
        </div>
      </div>
      <div className="mt-4">
        {sortCategory === "Project" ? (
          <ProjectLeaveRequest />
        ) : (
          <TeamLeaveRequest />
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
