import React from "react";

const MyProjects = () => {
  const projects = [
    "My Project 1",
    "My Project 2",
    "My Project 3",
    "My Project 4",
    "My Project 5",
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

export default MyProjects;
