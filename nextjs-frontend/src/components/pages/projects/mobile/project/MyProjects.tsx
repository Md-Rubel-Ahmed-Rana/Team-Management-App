import {
  useGetSingleProjectQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IProject } from "@/interfaces/project.interface";
import { IUser } from "@/interfaces/user.interface";
import React from "react";

const MyProjects = ({ setSelectedProject }: any) => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projectsData } = useMyProjectsQuery(user?._id);
  const projects: IProject[] = projectsData?.data || [];

  return (
    <select
      onChange={(e) => setSelectedProject(e.target.value)}
      className="p-2 w-full border rounded"
    >
      {projects?.length > 0 ? (
        <>
          {projects?.map((project: IProject) => (
            <option key={Math.random()} value={project._id}>
              {project.name}
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
