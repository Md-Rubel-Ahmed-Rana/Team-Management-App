import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React from "react";
import LeaveRequestSkeleton from "@/components/skeletons/LeavRequestSkeleton";
import { useMyProjectsQuery } from "@/features/project";
import { IProject } from "@/interfaces/project.interface";
import LeaveRequestList from "./LeaveRequestList";

const ProjectLeaveRequest = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: requestsData, isLoading } = useMyProjectsQuery(user?.id);
  const project: IProject[] = requestsData?.data;

  return (
    <div>
      {isLoading ? (
        <LeaveRequestSkeleton />
      ) : (
        <>
          {project?.length > 0 ? (
            project?.map((project) => (
              <LeaveRequestList
                key={project?.id}
                item={project}
                itemType="project"
              />
            ))
          ) : (
            <p>No leave requests</p>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectLeaveRequest;
