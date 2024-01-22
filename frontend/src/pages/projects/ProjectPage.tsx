import React, { useState } from "react";
import ProjectSidebar from "./ProjectSidebar";
import StatusNavbar from "./StatusNavbar";
import TaskPage from "./TaskPage";
import AddMemberToProject from "./AddMemberToProject";
import { useGetSingleProjectQuery } from "../../features/project/projectApi";

const tasksData = [
  {
    name: "Design homepage layout",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Implement user authentication",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
  {
    name: "Write API documentation",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "completed",
  },
  {
    name: "Fix responsive design issues",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Add search functionality",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
  {
    name: "Test application for bugs",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "completed",
  },
  {
    name: "Optimize database queries",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Refactor codebase for clarity",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
  {
    name: "Prepare release notes",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "completed",
  },
  {
    name: "Implement user profile page",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Fix authentication bug",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
  {
    name: "Write unit tests",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "completed",
  },
  {
    name: "Update UI components",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Implement email notifications",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
  {
    name: "Conduct user feedback survey",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "completed",
  },
  {
    name: "Optimize server response time",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Add user permissions feature",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
  {
    name: "Create demo video for release",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "completed",
  },
  {
    name: "Review and merge pull requests",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "todo",
  },
  {
    name: "Fix database schema issue",
    projectId: "asf5kh5iu5sr5yt745y7gwv54nyv47myn4n7v5m",
    assignedMember: {
      name: "Rubel",
      profile_picture: "https://i.ibb.co/b7nDmf6/emad.jpg",
    },
    assignedBy: {
      name: "Rubel",
    },
    status: "ongoing",
  },
];

const ProjectPage = () => {
  const [activeProject, setActiveProject] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: projectData } = useGetSingleProjectQuery(activeProject);
  const project = projectData?.data;

  const todosTask = tasksData.filter((task: any) => task.status === "todo");
  const ongoingTask = tasksData.filter(
    (task: any) => task.status === "ongoing"
  );
  const completedTask = tasksData.filter(
    (task: any) => task.status === "completed"
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
