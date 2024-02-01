import React, { useState } from "react";
import AssignedProjects from "./AssignedProjects";
import MyProjects from "./MyProjects";
import ProjectInfo from "./ProjectInfo";
import Tasks from "../tasks/Tasks";

const ProjectSelection = () => {
  const [selectedProject, setSelectedProject] = useState("My Projects");
  const [selectedCategory, setSelectedCategory] = useState("Tasks");
  const project = { name: "Octal phone store" };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Project Selection Part */}
      <div className="flex flex-col justify-between items-center gap-2">
        <div className="w-full">
          <select
            onChange={(e) => setSelectedProject(e.target.value)}
            name="main-project"
            id="main-project"
            className="p-2 w-full border rounded"
          >
            <option value="My Projects">My Projects</option>
            <option value="Assigned Projects">Assigned Projects</option>
          </select>
        </div>
        {selectedProject === "My Projects" ? (
          <MyProjects />
        ) : (
          <AssignedProjects />
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
          <Tasks />
        )}
      </div>
    </div>
  );
};

export default ProjectSelection;
