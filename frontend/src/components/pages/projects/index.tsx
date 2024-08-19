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

const ProjectsContainer = () => {
  const [isCreateNewProject, setIsCreateNewProject] = useState(false);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const {
    data: myProjects,
    isLoading: myProjectLoading,
    isSuccess,
  } = useMyProjectsQuery(user?.id);
  const { data: assignedProjects, isLoading: assignedProjectLoading } =
    useAssignedProjectsQuery(user?.id);
  return (
    <section className="flex flex-col gap-5 p-2">
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
          <div className="text-center py-10">
            <span className="text-lg lg:text-2xl text-white font-semibold bg-blue-600 px-5 py-2 rounded-md">
              Project loading...
            </span>
          </div>
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
      <hr />
      <div>
        <h1 className="text-lg lg:text-2xl font-semibold mb-2">
          Assigned Projects
        </h1>
        {assignedProjectLoading ? (
          <div className="text-center py-10">
            <span className="text-lg lg:text-2xl text-white font-semibold bg-blue-600 px-5 py-2 rounded-md">
              Project loading...
            </span>
          </div>
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
                  You have't been assigned to a project yet.
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

export default ProjectsContainer;
