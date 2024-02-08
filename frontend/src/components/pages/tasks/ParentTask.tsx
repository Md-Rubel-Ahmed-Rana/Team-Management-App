/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { reorderColumnList } from "@/utils/reorderTaskColumnList";
import { useUpdateStatusMutation } from "@/features/task";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

type Props = {
  project: any;
};

const ParentTask = ({ project }: Props) => {
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
    const initialColumns = state?.columnOrder.reduce(
      (acc: any, columnName: string) => {
        acc[columnName] = {
          id: columnName,
          title: columnName,
          taskIds: [],
        };
        return acc;
      },
      {}
    );

    setState((prevState: any) => ({
      ...prevState,
      columns: initialColumns,
    }));

    const token = Cookies.get("tmAccessToken");
    // Fetch tasks and update state if needed
    fetch(`http://localhost:5000/task/by-project/${project?._id}`, {
      headers: {
        authorization: token || "",
      },
    })
      .then((res) => res.json())
      .then((data: any) => {
        const dynamicData = data?.data?.reduce(
          (acc: any, task: any) => {
            acc.tasks[task?._id] = task;

            const statusColumnId = task?.status;
            if (!acc?.columns[statusColumnId]) {
              acc.columns[statusColumnId] = {
                id: statusColumnId,
                title: task?.status,
                taskIds: [],
              };
            }

            acc?.columns[statusColumnId]?.taskIds?.push(task?._id);

            return acc;
          },
          {
            tasks: {},
            columns: initialColumns,
            columnOrder: ["Todo", "Ongoing", "Completed"],
          }
        );
        setState(dynamicData);
      });
  }, [project?._id]);

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
