import React from "react";

const ProjectInfo = ({ project }: any) => {
  const projectData = {
    name: "Octal phone store",
    team: "Triangle Squad",
    category: "This is a shop management app",
    members: 4,
  };
  return (
    <div className="border shadow-md p-4">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold">Project: {projectData.name}</h3>
        <h5 className="font-light text-sm">Team: {projectData.team}</h5>
        <h6 className="font-light text-sm">Category: {projectData.category}</h6>
      </div>
      <hr className="my-2" />
      <div className="flex flex-col gap-2">
        <h4 className="font-bold text-lg">
          Total Member: {projectData.members}{" "}
        </h4>
        <div className="flex items-center justify-between">
          <p>
            <button className="bg-gray-200 dark:bg-gray-600 px-4 py-1 rounded-md">
              Add Member
            </button>
          </p>
          <p>
            <button className="bg-gray-200 dark:bg-gray-600 px-4 py-1 rounded-md">
              Remove Member
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
