import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import EditProjectModal from "./EditProjectModal";
import Swal from "sweetalert2";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import {
  useAssignedProjectsQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useMyTeamsQuery } from "@/features/team";
import { useRouter } from "next/router";
import { IProject } from "@/interfaces/project.interface";
import CreateProjectModal from "./CreateProjectModal";

const ProjectSidebar = ({ activeProject, setActiveProject }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editableProject, setEditableProject] = useState({});
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?.id);
  const { data: assignedProjects } = useAssignedProjectsQuery(user?.id);
  const { data: teamData } = useMyTeamsQuery(user?.id);
  const router = useRouter();

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
          router.push("/teams");
        }
      });
      return;
    } else {
      setIsOpen(true);
    }
  };

  const handleChangeProject = (project: IProject) => {
    setActiveProject(project.id);
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        team: project?.team,
        id: project?.id,
        name: project?.name,
      },
    });
  };

  return (
    <div className="w-1/5 px-4 border-r-2">
      <div>
        <h2 className="text-lg font-semibold mb-2">My Projects</h2>
        {projects?.data.length > 0 && (
          <div className="flex flex-col gap-2 overflow-hidden hover:overflow-auto h-48 scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
            {projects?.data?.map((project: IProject) => (
              <p
                onClick={() => handleChangeProject(project)}
                key={project?.id}
                className={`px-2 py-1 w-full hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 flex text-xl font-semibold justify-between   rounded-md ${
                  project?.id == activeProject && "bg-gray-100 dark:bg-gray-600"
                }`}
              >
                {project?.name.length > 20 ? (
                  <small>{project?.name?.slice(0, 20)} ...</small>
                ) : (
                  <small>{project?.name}</small>
                )}
              </p>
            ))}
          </div>
        )}
        {projects?.data?.length <= 0 && (
          <div className="h-48 flex flex-col justify-center items-center">
            <h1>No project created yet.</h1>
          </div>
        )}
      </div>
      <hr />
      <div>
        <h2 className="text-lg font-semibold mb-4">Assigned Projects</h2>
        {assignedProjects?.data?.length > 0 && (
          <div className="flex flex-col text-xl font-semibold gap-2 overflow-hidden hover:overflow-auto h-48 scrollbar scrollbar-w-[4px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
            {assignedProjects?.data?.map((project: IProject) => (
              <p
                onClick={() => handleChangeProject(project)}
                key={project?.id}
                className={`px-2 py-1 w-full hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 flex justify-between   rounded-md ${
                  project?.id == activeProject && "bg-gray-100 dark:bg-gray-600"
                }`}
              >
                {project?.name.length > 20 ? (
                  <small>{project?.name?.slice(0, 20)} ...</small>
                ) : (
                  <small>{project?.name}</small>
                )}
              </p>
            ))}
          </div>
        )}
        {assignedProjects?.data?.length <= 0 && (
          <div className="h-48 flex flex-col justify-center items-center">
            <h1>You haven&apos; assigned project</h1>
          </div>
        )}
      </div>

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
