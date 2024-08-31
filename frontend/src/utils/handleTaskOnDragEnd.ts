import toast from "react-hot-toast";
import { reorderColumnList } from "./reorderTaskColumnList";

export const handleTaskOnDragEnd = async (
  result: any,
  tasks: any,
  setTasks: any,
  updateStatus: any,
  socket: any
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

  let newState;

  if (sourceCol.id === destinationCol.id) {
    const newColumn = reorderColumnList(
      sourceCol,
      source.index,
      destination.index
    );

    newState = {
      ...tasks,
      columns: {
        ...tasks.columns,
        [newColumn.id]: newColumn,
      },
    };
    setTasks(newState);
  } else {
    // User moved the task to a different column
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

    newState = {
      ...tasks,
      columns: {
        ...tasks.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setTasks(newState);

    // Immediately update UI, and optimistically assume success
    const previousState = tasks; // Save the previous state for rollback

    try {
      const res: any = await updateStatus({
        id: result.draggableId,
        status: result.destination.droppableId,
      });

      if (res?.data?.success) {
        socket.emit("notification", res?.data?.data?.receiverId);

        // Emit the updated task object via the socket
        const updatedTask = {
          ...tasks.tasks[result.draggableId],
          status: result.destination.droppableId,
        };
        socket.emit("task", updatedTask);
        toast.success("Task status changed");
      } else {
        throw new Error("Status update failed");
      }
    } catch (error) {
      // If server update fails, rollback to the previous state
      setTasks(previousState);
      toast.error("Failed to update task status. Reverting changes.");
    }
  }
};
