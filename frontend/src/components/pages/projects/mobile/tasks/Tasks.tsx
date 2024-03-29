import React, { useState } from "react";
import TaskMobileCard from "./TaskMobileCard";
import TaskStatusNav from "./TaskStatusNav";
import { IProject } from "@/interfaces/project.interface";
import { useGetTasksByProjectQuery } from "@/features/task";
import CreateTaskModal from "@/components/pages/tasks/CreateTaskModal";

type Props = {
  project: IProject;
};

const Tasks = ({ project }: Props) => {
  const [activeStatus, setActiveStatus] = useState("Todo");
  const [isOpen, setIsOpen] = useState(false);
  const { data: taskData } = useGetTasksByProjectQuery(project?.id);
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
        setIsOpen={setIsOpen}
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
      {isOpen && (
        <CreateTaskModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          status={activeStatus}
          project={project}
        />
      )}
    </div>
  );
};

export default Tasks;
