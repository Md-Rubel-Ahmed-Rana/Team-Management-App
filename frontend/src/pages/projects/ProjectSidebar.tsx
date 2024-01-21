import React, { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import { useMyProjectsQuery } from "../../features/project/projectApi";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";
import { IProject } from "../../interfaces/project.interface";

const ProjectSidebar = ({ activeProject, setActiveProject }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?._id);

  useEffect(() => {
    setActiveProject(projects?.data[0]);
  }, []);

  return (
    <div className="bg-gray-800 text-white w-1/5 p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="overflow-hidden hover:overflow-auto h-72 scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {projects?.data?.map((project: IProject) => (
          <button
            key={project?._id}
            onClick={() => setActiveProject(project)}
            className={`px-4 py-2 w-full text-left  rounded-md ${
              project?._id == activeProject?._id
                ? "bg-blue-500 hover:bg-blue-700"
                : "hover:bg-gray-700"
            }`}
          >
            {project?.name}
          </button>
        ))}
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 mt-10 w-full text-center  rounded-md bg-green-600 hover:bg-green-300 hover:text-black font-semibold"
      >
        Create Project
      </button>
      {isOpen && <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ProjectSidebar;
