/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";

type Props = {
  task: any;
};

const TaskMobileCard = ({ task }: Props) => {
  const [editedTaskName, setEditedTaskName] = useState("");
  const [isEdit, setIsEdit] = useState(false);

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
        <h3
          title="Click to edit/delete task"
          onClick={() => setIsEdit(true)}
          className="text-md font-semibold cursor-pointer"
        >
          {task?.name}
        </h3>
      )}

      {isEdit && (
        <div className="flex justify-end gap-2 text-sm">
          <button className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200">
            Delete
          </button>
          <button
            onClick={() => setIsEdit(false)}
            className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200"
          >
            Cancel
          </button>
          <button className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200">
            Save changes
          </button>
        </div>
      )}
      <div className="text-sm">
        <h4>Deadline: {task?.deadline || "No deadline"}</h4>
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
