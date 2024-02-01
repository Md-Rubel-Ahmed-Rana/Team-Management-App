import React from "react";

const AssignedProjects = () => {
  const projects = [
    "Assigned Project 1",
    "Assigned Project 2",
    "Assigned Project 3",
    "Assigned Project 4",
    "Assigned Project 5",
  ];
  return (
    <select className="p-2 w-full border rounded">
      {projects.map((project) => (
        <option key={Math.random()} value={project}>
          {project}
        </option>
      ))}
    </select>
  );
};

export default AssignedProjects;
