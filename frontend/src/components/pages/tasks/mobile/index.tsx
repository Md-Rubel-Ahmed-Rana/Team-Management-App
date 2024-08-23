import React, { useState } from "react";
import TaskStatusNav from "./TaskStatusNav";
import { useGetTasksByProjectQuery } from "@/features/task";
import CreateTaskModal from "@/components/pages/tasks/modals/CreateTaskModal";
import { useRouter } from "next/router";
import { useGetSingleProjectQuery } from "@/features/project";
import TaskCard from "../common/TaskCard";
import TaskSkeleton from "@/components/skeletons/TaskSkeleton";

const TasksForMobileView = () => {
  const [activeStatus, setActiveStatus] = useState("Todo");
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useRouter();
  const { data: project } = useGetSingleProjectQuery(query?.id);
  const { data: taskData, isLoading } = useGetTasksByProjectQuery(
    project?.data?.id
  );
  const todoTasksArray =
    taskData?.data?.filter((task: any) => task?.status === "Todo") || [];
  const ongoingTasksArray =
    taskData?.data?.filter((task: any) => task?.status === "Ongoing") || [];
  const completedTasksArray =
    taskData?.data?.filter((task: any) => task?.status === "Completed") || [];

  return (
    <div className="px-2 py-5">
      <TaskStatusNav
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
        setIsOpen={setIsOpen}
      />
      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <div className="flex flex-col gap-2">
          {activeStatus === "Todo" && (
            <>
              {todoTasksArray?.map((task: any) => (
                <div className="flex flex-col gap-2 border rounded-md shadow-md p-4">
                  <TaskCard task={task} key={task?.id} />
                </div>
              ))}
            </>
          )}
          {activeStatus === "Ongoing" && (
            <>
              {ongoingTasksArray?.map((task: any) => (
                <div className="flex flex-col gap-2 border rounded-md shadow-md p-4">
                  <TaskCard task={task} key={task?.id} />
                </div>
              ))}
            </>
          )}
          {activeStatus === "Completed" && (
            <>
              {completedTasksArray?.map((task: any) => (
                <div className="flex flex-col gap-2 border rounded-md shadow-md p-4">
                  <TaskCard task={task} key={task?.id} />
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {isOpen && (
        <CreateTaskModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          status={activeStatus}
          project={project?.data}
        />
      )}
    </div>
  );
};

export default TasksForMobileView;
