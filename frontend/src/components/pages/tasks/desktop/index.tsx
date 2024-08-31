import {
  useGetTasksByProjectQuery,
  useUpdateStatusMutation,
} from "@/features/task";
import { handleTaskOnDragEnd } from "@/utils/handleTaskOnDragEnd";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { useGetSingleProjectQuery } from "@/features/project";
import TaskSkeleton from "@/components/skeletons/TaskSkeleton";
import { SocketContext } from "@/context/SocketContext";

const TasksForDesktopView = () => {
  const { socket }: any = useContext(SocketContext);
  const { query } = useRouter();
  const [tasks, setTasks] = useState<any>({
    tasks: {},
    columns: {},
    columnOrder: ["Todo", "Ongoing", "Completed"],
  });
  const { data, isLoading } = useGetTasksByProjectQuery(query?.id);
  const { data: project } = useGetSingleProjectQuery(query?.id);
  const [updateStatus] = useUpdateStatusMutation();

  useEffect(() => {
    if (!isLoading) {
      const tasksData = data?.data || [];
      const updatedState: any = {
        tasks: {},
        columns: {
          Todo: { id: "Todo", title: "Todo", taskIds: [] },
          Ongoing: { id: "Ongoing", title: "Ongoing", taskIds: [] },
          Completed: { id: "Completed", title: "Completed", taskIds: [] },
        },
        columnOrder: ["Todo", "Ongoing", "Completed"],
      };

      tasksData.forEach((task: any) => {
        updatedState.tasks[task.id] = task;

        // Check if the status column exists, if not, create it
        if (!updatedState.columns[task.status]) {
          updatedState.columns[task.status] = {
            id: task.status,
            title: task.status,
            taskIds: [],
          };
        }

        // Push task id to its corresponding column
        updatedState.columns[task.status].taskIds.push(task.id);
      });

      setTasks(updatedState);
    }
  }, [isLoading]);

  const onDragEnd = async (result: any) => {
    await handleTaskOnDragEnd(result, tasks, setTasks, updateStatus, socket);
  };

  // connect to task room with project id
  useEffect(() => {
    if (query?.id) {
      socket.emit("join-task-room", query?.id);
    }
  }, [query?.id, socket]);

  // receive task from socket
  useEffect(() => {
    socket.on("task", (newTask: any) => {
      setTasks((prevTasks: any) => {
        // Create a copy of the previous tasks state
        const updatedTasks = { ...prevTasks };

        // Check if the task already exists
        if (updatedTasks.tasks[newTask.id]) {
          const oldTask = updatedTasks.tasks[newTask.id];
          const oldColumn = updatedTasks.columns[oldTask.status];

          // Remove the task ID from its old column
          oldColumn.taskIds = oldColumn.taskIds.filter(
            (taskId: any) => taskId !== newTask.id
          );
        }

        // Add the new task to the tasks list
        updatedTasks.tasks[newTask.id] = newTask;

        // Ensure the column for the new task's status exists
        if (!updatedTasks.columns[newTask.status]) {
          updatedTasks.columns[newTask.status] = {
            id: newTask.status,
            title: newTask.status,
            taskIds: [],
          };
        }

        // Add the task ID to the appropriate column
        updatedTasks.columns[newTask.status].taskIds.push(newTask.id);

        return updatedTasks;
      });
    });

    return () => {
      socket.off("task");
    };
  }, [socket]);

  return (
    <div>
      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <div>
          <div className="px-2 mb-2">
            <h2 className="flex items-center gap-2">
              <b>Project:</b>{" "}
              <span className="text-lg font-semibold">
                {project?.data?.name}
              </span>
            </h2>
            <p className="flex items-center gap-2">
              <b>Category:</b>
              <span className="text-gray-500">{project?.data?.category}</span>
            </p>
          </div>
          <DragDropContext onDragEnd={onDragEnd}>
            <div>
              <div className="flex justify-between">
                {tasks?.columnOrder?.map((columnId: any) => {
                  const column = tasks?.columns[columnId];
                  const tasksByColumn = column?.taskIds?.map(
                    (taskId: any) => tasks?.tasks[taskId]
                  );
                  return (
                    <Column
                      key={Math.random()}
                      column={column}
                      tasks={tasksByColumn}
                      project={project?.data}
                    />
                  );
                })}
              </div>
            </div>
          </DragDropContext>
        </div>
      )}
    </div>
  );
};

export default TasksForDesktopView;
