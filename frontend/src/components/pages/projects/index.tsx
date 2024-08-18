import {
  useAssignedProjectsQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import ProjectCard from "./ProjectCard";
import { IProject } from "@/interfaces/project.interface";

const ProjectsContainer = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: myProjects } = useMyProjectsQuery(user?.id);
  const { data: assignedProjects } = useAssignedProjectsQuery(user?.id);
  return (
    <section className="flex flex-col gap-5 p-2">
      <div>
        <h1 className="text-lg lg:text-2xl font-semibold mb-2">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 lg:gap-5">
          {myProjects?.data?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      <hr />
      <div>
        <h1 className="text-lg lg:text-2xl font-semibold mb-2">
          Assigned Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-2 lg:gap-5">
          {assignedProjects?.data?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;
