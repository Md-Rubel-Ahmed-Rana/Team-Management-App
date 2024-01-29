import React, { useState } from "react";
import TeamLeaveRequest from "./TeamLeaveRequest";
import ProjectLeaveRequest from "./ProjectLeaveRequest";
import { useRouter } from "next/router";

const LeaveRequests = () => {
  const [sortCategory, setSortCategory] = useState("Project");
  const router = useRouter();
  const handleChangeSortCategory = (category: string) => {
    setSortCategory(category);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, sortCategory: category },
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-semibold">
          Your member requests to leave from team and project
        </h3>
        <select
          className={`w-40 text-center font-medium relative block px-5 py-2 border 
                   placeholder-gray-500  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
          onChange={(e) => handleChangeSortCategory(e.target.value)}
          name="category"
          id="category"
        >
          <option value="Project">Project</option>
          <option value="Team">Team</option>
        </select>
      </div>
      <div>
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
