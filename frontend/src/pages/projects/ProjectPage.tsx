import React, { useState } from "react";
import ProjectSidebar from "./ProjectSidebar";
import StatusNavbar from "./StatusNavbar";
import TaskPage from "./TaskPage";
import AddMemberToProject from "./AddMemberToProject";
import { useGetSingleProjectQuery } from "../../features/project/projectApi";
import { useGetTasksByProjectQuery } from "../../features/task/taskApi";
import { IProject } from "../../interfaces/project.interface";

const ProjectPage = () => {
  const [activeProject, setActiveProject] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: projectData } = useGetSingleProjectQuery(activeProject);
  const project: IProject = projectData?.data;

  const { data: tasks } = useGetTasksByProjectQuery(project?._id);

  const todosTask = tasks?.data?.filter((task: any) => task.status === "Todo");
  const ongoingTask = tasks?.data?.filter(
    (task: any) => task.status === "Ongoing"
  );

  const completedTask = tasks?.data?.filter(
    (task: any) => task.status === "Completed"
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <ProjectSidebar
        setActiveProject={setActiveProject}
        activeProject={activeProject}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-5">
          <div className="flex  justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Project: {project?.name}
              </h2>
              <h2 className=" font-semibold">Category: {project?.category}</h2>
            </div>
            <div className="flex flex-col gap-4 text-right">
              <h4 className="text-xl font-semibold">
                Total Member: {project?.members?.length}
              </h4>
              <p>
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-blue-700 text-white px-4 py-1 rounded-md"
                >
                  Add Member
                </button>
              </p>
            </div>
          </div>
          <StatusNavbar
            todos={todosTask?.length}
            ongoing={ongoingTask?.length}
            completed={completedTask?.length}
            project={project}
          />
          <TaskPage
            todosTask={todosTask}
            ongoingTask={ongoingTask}
            completedTask={completedTask}
          />
        </main>
      </div>
      {isOpen && (
        <AddMemberToProject
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          projectId={activeProject}
        />
      )}
    </div>
  );
};

export default ProjectPage;
