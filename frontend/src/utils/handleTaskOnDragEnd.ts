import { useUpdateStatusMutation } from "@/features/task";
import toast from "react-hot-toast";
import { reorderColumnList } from "./reorderTaskColumnList";

export const handleTaskOnDragEnd = async (
  result: any,
  tasks: any,
  setTasks: any,
  updateStatus: any
) => {
  const { destination, source } = result;
  if (!destination) return;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return;
  }

  const sourceCol = tasks.columns[source.droppableId];
  const destinationCol = tasks.columns[destination.droppableId];

  if (sourceCol.id === destinationCol.id) {
    const newColumn = reorderColumnList(
      sourceCol,
      source.index,
      destination.index
    );

    const newState = {
      ...tasks,
      columns: {
        ...tasks.columns,
        [newColumn.id]: newColumn,
      },
    };
    setTasks(newState);

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
    ...tasks,
    columns: {
      ...tasks.columns,
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
  setTasks(newState);
};
