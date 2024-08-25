import {
  useAssignedProjectsQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/interfaces/project.interface";
import { useState } from "react";
import CreateProjectModal from "./modals/CreateProjectModal";
import ProjectSkeleton from "@/components/skeletons/ProjectSkeleton";

const JoinedProjectsContainer = () => {
  const [isCreateNewProject, setIsCreateNewProject] = useState(false);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: assignedProjects, isLoading: assignedProjectLoading } =
    useAssignedProjectsQuery(user?.id);
  return (
    <section
      className={`flex flex-col gap-5 p-2 ${
        assignedProjects?.data?.length <= 4 ? "h-auto lg:h-screen" : "h-auto"
      }`}
    >
      <div>
        <h1 className="text-lg lg:text-2xl font-semibold mb-2">
          Joined Projects
        </h1>
        {assignedProjectLoading ? (
          <ProjectSkeleton />
        ) : (
          <>
            {assignedProjects?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-2 lg:gap-5">
                {assignedProjects?.data?.map((project: IProject) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    admin={user}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <span className="text-lg lg:text-2xl">
                  You have't been assigned to any project yet.
                </span>
              </div>
            )}
          </>
        )}
      </div>
      {isCreateNewProject && (
        <CreateProjectModal
          isOpen={isCreateNewProject}
          setIsOpen={setIsCreateNewProject}
        />
      )}
    </section>
  );
};

export default JoinedProjectsContainer;
