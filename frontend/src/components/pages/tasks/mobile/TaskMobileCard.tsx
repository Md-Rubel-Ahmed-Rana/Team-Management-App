/* eslint-disable @next/next/no-img-element */
import {
  useDeleteTaskMutation,
  useUpdateStatusMutation,
  useUpdateTaskMutation,
} from "@/features/task";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";

type Props = {
  task: any;
};

const TaskMobileCard = ({ task }: Props) => {
  const [editedTaskName, setEditedTaskName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [deleteTask, { isLoading: isDeletingTask }] = useDeleteTaskMutation();
  const [updateTask, { isLoading: isUpdatingTask }] = useUpdateTaskMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [toggleTask, setToggleTask] = useState("");

  const handleDeleteTask = async () => {
    const result: any = await deleteTask(task?.id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }
  };

  const handleEditTask = async () => {
    const result: any = await updateTask({
      id: task?.id,
      name: editedTaskName,
    });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }
  };

  const handleChangeStatus = async (status: string) => {
    const res: any = await updateStatus({
      id: task?.id,
      status,
    });
    if (res?.data?.success) {
      toast.success("Task status changed");
    }
  };

  return (
    <div className="flex flex-col gap-2 border rounded-md shadow-md p-4">
      {isEdit ? (
        <input
          type="text"
          name="name"
          defaultValue={task?.name}
          required
          id="name"
          onChange={(e) => setEditedTaskName(e.target.value)}
          className="w-full rounded-md  border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-1 outline-none px-2 shadow-sm sm:text-sm"
        />
      ) : (
        <div className=" flex justify-between gap-3 items-start relative">
          <span className="text-lg lg:text-xl">{task?.name}</span>
          <BsThreeDotsVertical
            title="Click to edit/delete task"
            className="cursor-pointer font-semibold text-xl"
            onClick={() => setToggleTask(task?.id)}
          />
          {toggleTask && toggleTask === task?.id && (
            <div className="absolute right-0 font-sans top-5 w-28 flex flex-col gap-2 justify-start text-start dark:bg-gray-700 bg-gray-200 rounded-md p-2">
              {isDeletingTask ? (
                <button className="text-sm font-semibold py-3 text-start rounded-sm">
                  Deleting task...
                </button>
              ) : (
                <>
                  <button
                    className="bg-white text-start px-2 rounded-sm"
                    onClick={() => {
                      setToggleTask("");
                      setIsEdit(true);
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
                    onClick={() => setToggleTask("")}
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {isEdit && (
        <div className="flex justify-end gap-2 text-sm">
          {isUpdatingTask ? (
            <button
              disabled={isUpdatingTask}
              className={`border ${
                isUpdatingTask ? "cursor-not-allowed" : ""
              } px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-400 text-white`}
            >
              Updating task...
            </button>
          ) : (
            <>
              <button
                onClick={() => setIsEdit(false)}
                className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleEditTask}
                className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200"
              >
                Save changes
              </button>
            </>
          )}
        </div>
      )}
      <div className="text-sm">
        <h4>Deadline: {task?.deadline || "No deadline"}</h4>
        <div className="flex items-center gap-3 mt-2">
          <p>Status: </p>
          {task.status === "Todo" && (
            <select
              onChange={(e) => handleChangeStatus(e.target.value)}
              className="border px-4 py-1 rounded-md"
              name="status"
              id="status"
            >
              <option disabled value="Todo">
                Todo
              </option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
          )}
          {task.status === "Ongoing" && (
            <select
              onChange={(e) => handleChangeStatus(e.target.value)}
              className="border px-4 py-1 rounded-md"
              name="status"
              id="status"
            >
              <option disabled value="Ongoing">
                Ongoing
              </option>
              <option value="Todo">Todo</option>
              <option value="Completed">Completed</option>
            </select>
          )}
          {task.status === "Completed" && (
            <select
              onChange={(e) => handleChangeStatus(e.target.value)}
              className="border px-4 py-1 rounded-md"
              name="status"
              id="status"
            >
              <option disabled value="Completed">
                Completed
              </option>
              <option value="Todo">Todo</option>
              <option value="Ongoing">Ongoing</option>
            </select>
          )}
        </div>
      </div>
      <div className="text-sm">
        <p>Assigned to: </p>
        <div className="flex items-center gap-2 mt-2 border px-3 py-2 rounded-md">
          {task?.assignedTo?.profile_picture ? (
            <img
              className="h-10 w-10 rounded-full"
              src={task?.assignedTo?.profile_picture}
              alt=""
            />
          ) : (
            <div className="bg-gray-600 w-10 h-10 rounded-full flex justify-center items-center text-white">
              {task?.assignedTo?.name.slice(0, 1)}
            </div>
          )}

          <div>
            <h5 className="font-medium">{task?.assignedTo?.name}</h5>
            <p className="text-xs">{task?.assignedTo?.designation}</p>
          </div>
        </div>
      </div>
      <p className="text-sm">By: {task?.assignedBy?.name}</p>
    </div>
  );
};

export default TaskMobileCard;
