import React, { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import { useMyProjectsQuery } from "../../features/project/projectApi";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";
import { IProject } from "../../interfaces/project.interface";
import { FaEllipsisV } from "react-icons/fa";
import EditProjectModal from "./EditProjectModal";

const ProjectSidebar = ({ activeProject, setActiveProject }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableProject, setEditableProject] = useState({});
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?._id);

  const handleEditProject = (project: IProject) => {
    setIsEdit(true);
    setEditableProject(project);
  };

  useEffect(() => {
    setActiveProject(projects?.data[0]._id);
  }, []);

  return (
    <div className="bg-gray-800 text-white w-1/5 p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      <div className="overflow-hidden hover:overflow-auto h-72 scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {projects?.data?.map((project: IProject) => (
          <p
            key={project?._id}
            className={`px-4 py-2 w-full flex justify-between   rounded-md ${
              project?._id == activeProject
                ? "bg-blue-500 hover:bg-blue-700"
                : "hover:bg-gray-700"
            }`}
          >
            <button
              className="w-full text-left"
              onClick={() => setActiveProject(project._id)}
            >
              {project?.name}
            </button>
            <button
              onClick={() => handleEditProject(project)}
              className="hover:bg-gray-600 p-2 rounded-full"
            >
              <FaEllipsisV />
            </button>
          </p>
        ))}
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 mt-10 w-full text-center  rounded-md bg-green-600 hover:bg-green-300 hover:text-black font-semibold"
      >
        Create Project
      </button>
      {isOpen && <CreateProjectModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      {isEdit && (
        <EditProjectModal
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          project={editableProject}
        />
      )}
    </div>
  );
};

export default ProjectSidebar;
