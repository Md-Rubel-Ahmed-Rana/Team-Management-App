/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { reorderColumnList } from "@/utils/reorderTaskColumnList";
import { useUpdateStatusMutation } from "@/features/task";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { SocketContext } from "@/context/SocketContext";

type Props = {
  project: any;
};

const ParentTask = ({ project }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const [updateStatus] = useUpdateStatusMutation();
  const [state, setState] = useState<any>({
    tasks: {},
    columns: {},
    columnOrder: ["Todo", "Ongoing", "Completed"],
  });

  const onDragEnd = async (result: any) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);

      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    // update status on Database
    const res: any = await updateStatus({
      id: result.draggableId,
      status: result?.destination?.droppableId,
    });
    if (res?.data?.success) {
      toast.success("Task status changed");
    }
    setState(newState);
  };

  useEffect(() => {
    const token = Cookies.get("tmAccessToken");

    // Fetch tasks only if project id is available
    if (project?.id) {
      fetch(`http://localhost:5000/task/by-project/${project.id}`, {
        headers: {
          authorization: token || "",
        },
      })
        .then((res) => res.json())
        .then((data: any) => {
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

          setState(updatedState);
        })
        .catch((error) => {
          console.error("Error fetching tasks:", error);
        });
    }
  }, [project?.id]);

  // Define a function to update state with new task
  const addNewTask = (newTask: any) => {
    setState((prevState: any) => {
      const updatedState = { ...prevState };

      // Add the new task to the tasks object
      updatedState.tasks[newTask.id] = newTask;

      // Check if the status column exists, if not, create it
      if (!updatedState.columns[newTask.status]) {
        updatedState.columns[newTask.status] = {
          id: newTask.status,
          title: newTask.status,
          taskIds: [],
        };
      }

      // Push task id to its corresponding column
      updatedState.columns[newTask.status].taskIds.push(newTask.id);

      return updatedState;
    });
  };

  // Listen for new tasks from socket
  useEffect(() => {
    socket.on("task", (newTask: any) => {
      console.log("New task data", newTask);
      addNewTask(newTask);
    });

    return () => {
      socket.off("task");
    };
  }, [socket]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-col">
        <div className="flex justify-between">
          {state?.columnOrder?.map((columnId: any) => {
            const column = state?.columns[columnId];
            const tasks = column?.taskIds?.map(
              (taskId: any) => state?.tasks[taskId]
            );
            return (
              <Column
                key={Math.random()}
                column={column}
                tasks={tasks}
                project={project}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default ParentTask;
