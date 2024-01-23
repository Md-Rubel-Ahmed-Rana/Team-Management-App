import React, { useEffect, useState } from "react";
import CreateProjectModal from "./CreateProjectModal";
import { useMyProjectsQuery } from "../../features/project/projectApi";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";
import { IProject } from "../../interfaces/project.interface";
import { FaEllipsisV } from "react-icons/fa";
import EditProjectModal from "./EditProjectModal";
import { useMyTeamsQuery } from "../../features/team/teamApi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProjectSidebar = ({ activeProject, setActiveProject }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableProject, setEditableProject] = useState({});
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?._id);

  const { data: teamData } = useMyTeamsQuery(user?._id);
  const navigate = useNavigate();

  const handleEditProject = (project: IProject) => {
    setIsEdit(true);
    setEditableProject(project);
  };

  const handleOpenCreateProjectModal = () => {
    if (teamData?.data?.length <= 0) {
      Swal.fire({
        position: "center",
        icon: "error",
      });
      Swal.fire({
        title: "Oops",
        text: "You don't have team. Please create team first then create project",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Okay",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/teams");
        }
      });
      return;
    } else {
      setIsOpen(true);
    }
  };

  useEffect(() => {
    setActiveProject(projects?.data[0]?._id);
  }, []);

  return (
    <div className="w-1/5 px-4 border-r-2">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>
      {projects?.data.length > 0 && (
        <div className="flex flex-col gap-2 overflow-hidden hover:overflow-auto h-80 scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
          {projects?.data?.map((project: IProject) => (
            <p
              key={project?._id}
              className={`px-4 py-2 w-full hover:bg-gray-100 flex justify-between   rounded-md ${
                project?._id == activeProject && "bg-gray-100"
              }`}
            >
              <button
                className="w-full text-left"
                onClick={() => setActiveProject(project?._id)}
              >
                {project?.name}
              </button>
              <button
                onClick={() => handleEditProject(project)}
                className="hover:bg-gray-200 p-2 rounded-full"
              >
                <FaEllipsisV />
              </button>
            </p>
          ))}
        </div>
      )}
      {projects?.data?.length <= 0 && (
        <div className="h-72 flex flex-col justify-center items-center">
          <h1>No project created yet.</h1>
        </div>
      )}
      <button
        onClick={handleOpenCreateProjectModal}
        className="px-4 py-2 mt-10 w-full text-center  rounded-md bg-green-600 hover:bg-green-500 text-white font-semibold"
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
