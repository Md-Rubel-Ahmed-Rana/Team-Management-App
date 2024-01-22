import React from "react";
import { useUpdateStatusMutation } from "../../features/task/taskApi";
import toast from "react-hot-toast";

const TaskCard = ({ task, style }: any) => {
  const { _id, name, status, assignedMember, assignedBy } = task;
  const [updateStatus] = useUpdateStatusMutation();

  const handleChangeStatus = async (text: string) => {
    if (text !== status) {
      const result: any = await updateStatus({ id: _id, status: text });
      if (result?.data?.success) {
        toast.success("Task status changed");
      }
    }
  };

  return (
    <div className={`${style} flex flex-col gap-3`}>
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="flex justify-between items-center">
        <p>Status: {status}</p>
        <select
          onChange={(e) => handleChangeStatus(e.target.value)}
          className="rounded-md bg-white border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-1 outline-none px-2 shadow-sm sm:text-sm"
          name="status"
          id="status"
        >
          {status === "Todo" && (
            <>
              <option value={status}>{status}</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </>
          )}
          {status === "Ongoing" && (
            <>
              <option value={status}>{status}</option>
              <option value="Todo">Todo</option>
              <option value="Completed">Completed</option>
            </>
          )}
          {status === "Completed" && (
            <>
              <option value={status}>{status}</option>
              <option value="Todo">Todo</option>
              <option value="Ongoing">Ongoing</option>
            </>
          )}
        </select>
      </div>
      <div>
        <p>Assigned Member: </p>
        <div className="flex items-center gap-2 bg-violet-500 px-3 py-2 rounded-md">
          <img
            className="h-10 w-10 rounded-full"
            src={assignedMember?.profile_picture}
            alt=""
          />
          <h5>{assignedMember?.name}</h5>
        </div>
      </div>
      <p>Assigned by: {assignedBy?.name}</p>
    </div>
  );
};

export default TaskCard;
