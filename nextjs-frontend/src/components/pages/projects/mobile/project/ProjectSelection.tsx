import React, { useState } from "react";
import AssignedProjects from "./AssignedProjects";
import MyProjects from "./MyProjects";
import ProjectInfo from "./ProjectInfo";
import Tasks from "../tasks/Tasks";
import { useGetSingleProjectQuery } from "@/features/project";
import { IProject } from "@/interfaces/project.interface";

const ProjectSelection = () => {
  const [selectedProjectType, setSelectedProjectType] = useState("My Projects");
  const [selectedCategory, setSelectedCategory] = useState("Tasks");
  const [selectedProject, setSelectedProject] = useState("");
  const { data: projectData } = useGetSingleProjectQuery(selectedProject);
  const project: IProject = projectData?.data;

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Project Selection Part */}
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full">
          <select
            onChange={(e) => setSelectedProjectType(e.target.value)}
            name="main-project"
            id="main-project"
            className="p-2 w-full border rounded"
          >
            <option value="My Projects">My Projects</option>
            <option value="Assigned Projects">Assigned Projects</option>
          </select>
        </div>
        {selectedProjectType === "My Projects" ? (
          <MyProjects setSelectedProject={setSelectedProject} />
        ) : (
          <AssignedProjects setSelectedProject={setSelectedProject} />
        )}
      </div>

      {/* Project Info and Task Show */}
      <div className="flex w-full justify-between items-center gap-2">
        <p className="w-1/2">
          <button
            onClick={() => setSelectedCategory("Tasks")}
            className={`${
              selectedCategory === "Tasks" && "bg-gray-200 dark:bg-gray-600"
            } border w-full px-4 py-2 rounded`}
          >
            Tasks
          </button>
        </p>
        <p className="w-1/2">
          <button
            onClick={() => setSelectedCategory("Project info")}
            className={`${
              selectedCategory === "Project info" &&
              "bg-gray-200 dark:bg-gray-600"
            } border w-full px-4 py-2 rounded`}
          >
            Project Info
          </button>
        </p>
      </div>

      <div>
        {selectedCategory === "Project info" ? (
          <ProjectInfo project={project} />
        ) : (
          <Tasks project={project} />
        )}
      </div>
    </div>
  );
};

export default ProjectSelection;
