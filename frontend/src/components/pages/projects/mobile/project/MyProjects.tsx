/* eslint-disable react-hooks/exhaustive-deps */
import { useMyProjectsQuery } from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IProject } from "@/interfaces/project.interface";
import { IUser } from "@/interfaces/user.interface";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const MyProjects = ({ setSelectedProject }: any) => {
  const router = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projectsData } = useMyProjectsQuery(user?.id);
  const projects: IProject[] = projectsData?.data;

  const handleChangeProject = (projectId: string) => {
    const project = projects.find((prj) => prj.id === projectId);
    setSelectedProject(project?.id);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        team: project?.team?.name,
        id: project?.id,
        name: project?.name,
      },
    });
  };

  useEffect(() => {
    const project: any = projects?.length > 0 ? projects[0] : [];
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        team: project?.team?.name || "unknown",
        id: project?.id,
        name: project?.name,
      },
    });
  }, []);

  return (
    <select
      onChange={(e) => handleChangeProject(e.target.value)}
      className="p-2 w-full border rounded"
    >
      {projects?.length > 0 ? (
        <>
          {projects?.map((project: IProject) => (
            <option key={Math.random()} value={project?.id}>
              {project?.name}
            </option>
          ))}
        </>
      ) : (
        <option selected disabled value="">
          No project
        </option>
      )}
    </select>
  );
};

export default MyProjects;
