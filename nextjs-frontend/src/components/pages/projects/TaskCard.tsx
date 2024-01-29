/* eslint-disable @next/next/no-img-element */
import {
  useDeleteTaskMutation,
  useUpdateStatusMutation,
  useUpdateTaskMutation,
} from "@/features/task";
import { useState } from "react";

import toast from "react-hot-toast";

type Props = {
  task: any;
  style: string;
};

const TaskCard = ({ task, style }: Props) => {
  const { _id, name, deadline, status, assignedTo, assignedBy } = task;
  const [updateStatus] = useUpdateStatusMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [editedTask, setEditedTask] = useState("");

  const handleChangeStatus = async (text: string) => {
    if (text !== status) {
      const result: any = await updateStatus({ id: _id, status: text });
      if (result?.data?.success) {
        toast.success("Task status changed");
      }
    }
  };

  const handleEditTask = async () => {
    await updateTask({ id: _id, name: editedTask });
    setIsEdit(false);
  };

  const handleDeleteTask = async () => {
    const result: any = await deleteTask(_id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setIsEdit(false);
    }
  };

  return (
    <div
      className={`${style} flex flex-col gap-3 p-4 rounded-md shadow-md border`}
    >
      {isEdit && (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="name"
            defaultValue={name}
            required
            id="name"
            onChange={(e) => setEditedTask(e.target.value)}
            className=" w-full rounded-md bg-white border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-1 outline-none px-2 shadow-sm sm:text-sm"
          />
          <div className="flex justify-between">
            <button
              onClick={handleDeleteTask}
              className="bg-red-700 px-2 py-1 rounded-md text-white"
            >
              Delete
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="bg-sky-600 px-2 py-1 rounded-md text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleEditTask}
              className="bg-green-700 px-2 py-1 rounded-md text-white"
            >
              Save changes
            </button>
          </div>
        </div>
      )}
      {!isEdit && (
        <h3
          title="Click to edit/delete task"
          onClick={() => setIsEdit(true)}
          className="text-xl font-semibold cursor-pointer"
        >
          {name}
        </h3>
      )}

      <div className="flex justify-between items-center">
        <p>Status: {status}</p>
        <select
          onChange={(e) => handleChangeStatus(e.target.value)}
          className="rounded-md border placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-1 outline-none px-2 shadow-sm sm:text-sm cursor-pointer"
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
        <h4>Deadline: {deadline || "No deadline"}</h4>
      </div>
      <div>
        <p>Assigned to: </p>
        <div className="flex items-center gap-2 mt-2 border px-3 py-2 rounded-md">
          <img
            className="h-10 w-10 rounded-full"
            src={assignedTo?.profile_picture}
            alt=""
          />
          <div>
            <h5 className="text-lg  font-medium">{assignedTo?.name}</h5>
            <p>{assignedTo?.designation}</p>
          </div>
        </div>
      </div>
      <p>Assigned by: {assignedBy?.name}</p>
    </div>
  );
};

export default TaskCard;
