import TeamLeaveRequest from "./TeamLeaveRequest";
import ProjectLeaveRequest from "./ProjectLeaveRequest";

const LeaveRequests = () => {
  return (
    <div className="lg:w-[76vw]">
      <h3 className="text-lg lg:text-2xl">
        Your member requests to leave from team and project
      </h3>
      <div className="mt-4 flex flex-col lg:flex-row gap-3 w-full lg:w-2/3">
        <div className="w-full">
          <h2 className="text-lg font-semibold bg-gray-300 text-center">
            Team
          </h2>
          <TeamLeaveRequest />
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold bg-gray-300 text-center">
            Project
          </h2>
          <ProjectLeaveRequest />
        </div>
      </div>
    </div>
  );
};

export default LeaveRequests;
