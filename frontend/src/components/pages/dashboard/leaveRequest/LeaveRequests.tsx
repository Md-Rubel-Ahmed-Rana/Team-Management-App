import TeamLeaveRequest from "./TeamLeaveRequest";
import ProjectLeaveRequest from "./ProjectLeaveRequest";
import { useState } from "react";
import dynamic from "next/dynamic";
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

const LeaveRequests = () => {
  const [active, setActive] = useState("team");
  return (
    <div className="lg:w-[76vw]">
      <h3 className="text-lg lg:text-2xl">
        Your member requests to leave from team and project
      </h3>
      <div className="flex items-center gap-2 mb-5">
        <Button
          onClick={() => setActive("team")}
          className={`${active === "team" ? "bg-blue-600 text-white" : ""}`}
          type="default"
        >
          Team
        </Button>
        <Button
          onClick={() => setActive("project")}
          className={`${active === "project" ? "bg-blue-600 text-white" : ""}`}
          type="default"
        >
          Project
        </Button>
      </div>
      {active === "team" ? <TeamLeaveRequest /> : <ProjectLeaveRequest />}
    </div>
  );
};

export default LeaveRequests;
