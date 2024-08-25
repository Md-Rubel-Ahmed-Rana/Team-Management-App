import { useMyProjectsQuery } from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/interfaces/project.interface";
import { useState } from "react";
import CreateProjectModal from "./modals/CreateProjectModal";
import ProjectSkeleton from "@/components/skeletons/ProjectSkeleton";

const MyProjectsContainer = () => {
  const [isCreateNewProject, setIsCreateNewProject] = useState(false);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: myProjects, isLoading: myProjectLoading } = useMyProjectsQuery(
    user?.id
  );

  return (
    <section
      className={`flex flex-col gap-5 p-2 ${
        myProjects?.data?.length <= 4 ? "h-auto lg:h-screen" : "h-auto"
      }`}
    >
      <div>
        <div className="flex justify-between mb-2">
          <h1 className="text-lg lg:text-2xl font-semibold">My Projects</h1>
          <button
            onClick={() => setIsCreateNewProject(true)}
            className="px-2 py-1 lg:px-4 lg:py-2 text-center  rounded-md bg-green-600 hover:bg-green-500 text-white lg:font-semibold"
          >
            Create Project
          </button>
        </div>
        {myProjectLoading ? (
          <ProjectSkeleton />
        ) : (
          <>
            {myProjects?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 lg:gap-5">
                {myProjects?.data?.map((project: IProject) => (
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
                  You have not created any projects yet.
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

export default MyProjectsContainer;
