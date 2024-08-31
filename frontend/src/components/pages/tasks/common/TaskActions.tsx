import { SocketContext } from "@/context/SocketContext";
import { useDeleteTaskMutation } from "@/features/task";
import { useContext } from "react";
import toast from "react-hot-toast";

type Props = {
  setShowActions: (value: boolean) => void;
  setIsEditTask: (value: boolean) => void;
  taskId: string;
};

const TaskActions = ({ setIsEditTask, setShowActions, taskId }: Props) => {
  const { socket }: any = useContext(SocketContext);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();
  const handleDeleteTask = async () => {
    const result: any = await deleteTask(taskId);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      socket.emit("notification", result?.data?.data?.receiverId);
      setShowActions(false);
      window.location.reload();
    }
  };

  return (
    <div className="absolute right-0 font-sans top-6 w-28 flex flex-col gap-2 justify-start text-start dark:bg-gray-700 bg-gray-200 rounded-md p-2">
      {isLoading ? (
        <button className="text-sm font-semibold text-start rounded-sm">
          Deleting task...
        </button>
      ) : (
        <>
          <button
            className="bg-white text-start px-2 rounded-sm"
            onClick={() => {
              setIsEditTask(true);
              setShowActions(false);
            }}
          >
            Edit
          </button>
          <button
            onClick={handleDeleteTask}
            className="bg-white text-start px-2 rounded-sm"
          >
            Delete
          </button>
          <button
            className="bg-white text-start px-2 rounded-sm"
            onClick={() => setShowActions(false)}
          >
            Cancel
          </button>
        </>
      )}
    </div>
  );
};

export default TaskActions;
