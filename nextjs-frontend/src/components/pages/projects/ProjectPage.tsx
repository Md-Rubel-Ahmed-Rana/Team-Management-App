import React, { useEffect, useState } from "react";
import ProjectSidebar from "./ProjectSidebar";
import StatusNavbar from "./StatusNavbar";
import TaskPage from "./TaskPage";
import AddMemberToProject from "./AddMemberToProject";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import {
  useAssignedProjectsQuery,
  useGetMemberLeaveProjectRequestQuery,
  useGetSingleProjectQuery,
  useLeaveProjectRequestMutation,
  useMyProjectsQuery,
} from "@/features/project";
import { IProject } from "@/interfaces/project.interface";
import { useGetTasksByProjectQuery } from "@/features/task";
import RemoveMemberFromProject from "./RemoveMemberFromProject";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const Projects = () => {
  const { query } = useRouter();
  const [activeProject, setActiveProject] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projectData } = useGetSingleProjectQuery(activeProject);
  const project: IProject = projectData?.data;
  const { data: projects } = useMyProjectsQuery(user?._id);
  const { data: assignedProjects } = useAssignedProjectsQuery(user?._id);
  const [leaveRequest] = useLeaveProjectRequestMutation();
  const { data: memberLeaveRequest } = useGetMemberLeaveProjectRequestQuery(
    user?._id
  );

  const { data: tasks } = useGetTasksByProjectQuery(project?._id);

  const todosTask = tasks?.data?.filter((task: any) => task.status === "Todo");
  const ongoingTask = tasks?.data?.filter(
    (task: any) => task.status === "Ongoing"
  );

  const completedTask = tasks?.data?.filter(
    (task: any) => task.status === "Completed"
  );

  const handleLeaveRequest = async () => {
    Swal.fire({
      title: "So sad",
      text: "Are you sure to leave from this project",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yeas",
    }).then((result) => {
      if (result?.isConfirmed) {
        const leaveData = {
          project: project?._id,
          member: user?._id,
          admin: project?.user,
        };
        const leaveHandler = async () => {
          const result: any = await leaveRequest(leaveData);
          if (result?.data?.success) {
            Swal.fire("Done!", `${result?.data?.message}`, "success");
          }
          if (result?.error) {
            Swal.fire("Done!", `${result?.error?.data?.message}`, "error");
          }
        };
        leaveHandler();
      }
    });
  };

  useEffect(() => {
    setActiveProject(query?.id);
  }, [query?.id]);

  return (
    <div className="flex h-screen">
      <ProjectSidebar
        setActiveProject={setActiveProject}
        activeProject={activeProject}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto px-5">
          <>
            <div className="flex  justify-between items-center mb-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold ">
                  Project: {project?.name}
                </h2>
                <h5 className="font-semibold">Team: {project?.team?.name}</h5>
                <h5 className="font-semibold">Category: {project?.category}</h5>
              </div>
              <div className="flex flex-col gap-4 text-right">
                <h4 className="text-xl font-semibold">
                  Total Member: {project?.members?.length}
                </h4>
                {project?.user === user?._id && (
                  <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-700 text-white px-4 py-1 rounded-md"
                  >
                    Add Member
                  </button>
                )}

                {project?.user === user?._id && (
                  <div>
                    <p className="flex flex-col gap-2">
                      <button
                        onClick={() => setIsRemove(true)}
                        className="bg-blue-700 text-white px-4 py-1 rounded-md"
                      >
                        Remove Member
                      </button>
                    </p>
                  </div>
                )}

                {project?.user !== user?._id && (
                  <button
                    onClick={handleLeaveRequest}
                    disabled={
                      memberLeaveRequest?.data?.project === project?._id
                    }
                    className={` ${
                      memberLeaveRequest?.data?.project === project?._id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-700"
                    } text-white px-4 py-1 rounded-md`}
                  >
                    {memberLeaveRequest?.data?.project === project?._id
                      ? "Requested"
                      : "Request to leave"}
                  </button>
                )}
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
          </>
          {projects?.data?.length <= 0 &&
            assignedProjects?.data?.length <= 0 && (
              <div className="h-screen flex justify-center items-center">
                <h2 className="lg:text-3xl font-semibold">
                  You haven&apos; create any project yet. Create project to show
                  here
                </h2>
              </div>
            )}
        </main>
      </div>
      {isOpen && (
        <AddMemberToProject
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          projectId={activeProject}
          team={project?.team}
        />
      )}

      {isRemove && (
        <RemoveMemberFromProject
          isRemove={isRemove}
          setIsRemove={setIsRemove}
          projectId={activeProject}
          team={project?.team}
        />
      )}
    </div>
  );
};

export default Projects;
