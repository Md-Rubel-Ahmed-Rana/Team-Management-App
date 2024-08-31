import React, { useContext, useEffect, useState } from "react";
import TaskStatusNav from "./TaskStatusNav";
import { useGetTasksByProjectQuery } from "@/features/task";
import CreateTaskModal from "@/components/pages/tasks/modals/CreateTaskModal";
import { useRouter } from "next/router";
import { useGetSingleProjectQuery } from "@/features/project";
import TaskCard from "../common/TaskCard";
import TaskSkeleton from "@/components/skeletons/TaskSkeleton";
import { SocketContext } from "@/context/SocketContext";
import { INewTaskForSocket } from "@/interfaces/task.interface";

const TasksForMobileView = () => {
  const { socket }: any = useContext(SocketContext);
  const [activeStatus, setActiveStatus] = useState("Todo");
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useRouter();
  const { data: project } = useGetSingleProjectQuery(query?.id);
  const { data: taskData, isLoading } = useGetTasksByProjectQuery(
    project?.data?.id || query?.id
  );

  const [todoTasks, setTodoTasks] = useState<INewTaskForSocket[]>([]);
  const [ongoingTasks, setOngoingTasks] = useState<INewTaskForSocket[]>([]);
  const [completedTasks, setCompletedTasks] = useState<INewTaskForSocket[]>([]);

  // Set tasks state when taskData is fetched
  useEffect(() => {
    if (taskData?.data) {
      setTodoTasks(
        taskData.data.filter(
          (task: INewTaskForSocket) => task?.status === "Todo"
        )
      );
      setOngoingTasks(
        taskData.data.filter(
          (task: INewTaskForSocket) => task?.status === "Ongoing"
        )
      );
      setCompletedTasks(
        taskData.data.filter(
          (task: INewTaskForSocket) => task?.status === "Completed"
        )
      );
    }
  }, [taskData]);

  // Connect to task room with project id
  useEffect(() => {
    if (query?.id) {
      socket.emit("join-task-room", query?.id);
    }
  }, [query?.id, socket]);

  // Handle new tasks from socket
  useEffect(() => {
    socket.on("task", (newTask: INewTaskForSocket) => {
      setTodoTasks((prev: INewTaskForSocket[]) =>
        prev.filter((task) => task.id !== newTask.id)
      );
      setOngoingTasks((prev: INewTaskForSocket[]) =>
        prev.filter((task) => task.id !== newTask.id)
      );
      setCompletedTasks((prev: INewTaskForSocket[]) =>
        prev.filter((task) => task.id !== newTask.id)
      );

      // Now add the newTask to the appropriate state based on its status
      if (newTask?.status.toLowerCase() === "todo") {
        setTodoTasks((prev: INewTaskForSocket[]) => [...prev, newTask]);
      } else if (newTask?.status.toLowerCase() === "ongoing") {
        setOngoingTasks((prev: INewTaskForSocket[]) => [...prev, newTask]);
      } else if (newTask?.status.toLowerCase() === "completed") {
        setCompletedTasks((prev: INewTaskForSocket[]) => [...prev, newTask]);
      }
    });

    return () => {
      socket.off("task");
    };
  }, [socket]);

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
        <div className={`flex flex-col gap-2`}>
          {activeStatus === "Todo" && (
            <>
              {todoTasks.length > 0 ? (
                todoTasks?.map((task: any) => (
                  <div
                    className="flex flex-col gap-2 border rounded-md shadow-md p-4"
                    key={task?.id}
                  >
                    <TaskCard task={task} />
                  </div>
                ))
              ) : (
                <p className="h-screen flex justify-center items-center">
                  <strong>No task assigned</strong>
                </p>
              )}
            </>
          )}
          {activeStatus === "Ongoing" && (
            <>
              {ongoingTasks.length > 0 ? (
                ongoingTasks?.map((task: any) => (
                  <div
                    className="flex flex-col gap-2 border rounded-md shadow-md p-4"
                    key={task?.id}
                  >
                    <TaskCard task={task} />
                  </div>
                ))
              ) : (
                <p className="h-screen flex justify-center items-center">
                  <strong>No task assigned</strong>
                </p>
              )}
            </>
          )}
          {activeStatus === "Completed" && (
            <>
              {completedTasks.length > 0 ? (
                completedTasks?.map((task: any) => (
                  <div
                    className="flex flex-col gap-2 border rounded-md shadow-md p-4"
                    key={task?.id}
                  >
                    <TaskCard task={task} />
                  </div>
                ))
              ) : (
                <p className="h-screen flex justify-center items-center">
                  <strong>No task assigned</strong>
                </p>
              )}
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
