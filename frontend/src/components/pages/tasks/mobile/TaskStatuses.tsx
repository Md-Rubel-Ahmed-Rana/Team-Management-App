import { useUpdateStatusMutation } from "@/features/task";
import toast from "react-hot-toast";

type Props = {
  task: any;
};

const TaskStatuses = ({ task }: Props) => {
  const [updateStatus] = useUpdateStatusMutation();
  const handleChangeStatus = async (status: string) => {
    if (status === task?.status) {
      toast.error("Same status could't be change!");
      return;
    }
    const res: any = await updateStatus({
      id: task?.id,
      status,
    });
    if (res?.data?.success) {
      toast.success("Task status changed");
    }
  };
  const defaultValue =
    task?.status === "Todo"
      ? "Todo"
      : task?.status === "Ongoing"
      ? "Ongoing"
      : "Completed";
  return (
    <div className="flex items-center gap-3 mt-2">
      <p>Status: </p>
      <select
        onChange={(e) => handleChangeStatus(e.target.value)}
        className="border px-4 py-1 rounded-md bg-white"
        name="status"
        id="status"
        defaultValue={defaultValue}
      >
        <option value="Todo">Todo</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default TaskStatuses;
