import React, { useState } from "react";
import TaskMobileCard from "./TaskMobileCard";
import TaskStatusNav from "./TaskStatusNav";
import { IProject } from "@/interfaces/project.interface";
import { useGetTasksByProjectQuery } from "@/features/task";

type Props = {
  project: IProject;
};

const Tasks = ({ project }: Props) => {
  const [activeStatus, setActiveStatus] = useState("Todo");
  const { data: taskData } = useGetTasksByProjectQuery(project?._id);
  const todoTasksArray =
    taskData?.data?.filter((task: any) => task?.status === "Todo") || [];
  const ongoingTasksArray =
    taskData?.data?.filter((task: any) => task?.status === "Ongoing") || [];
  const completedTasksArray =
    taskData?.data?.filter((task: any) => task?.status === "Completed") || [];

  return (
    <div>
      <TaskStatusNav
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
      <div className="flex flex-col gap-2">
        {activeStatus === "Todo" && (
          <>
            {todoTasksArray?.map((task: any) => (
              <TaskMobileCard task={task} key={Math.random()} />
            ))}
          </>
        )}
        {activeStatus === "Ongoing" && (
          <>
            {ongoingTasksArray?.map((task: any) => (
              <TaskMobileCard task={task} key={Math.random()} />
            ))}
          </>
        )}
        {activeStatus === "Completed" && (
          <>
            {completedTasksArray?.map((task: any) => (
              <TaskMobileCard task={task} key={Math.random()} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;
