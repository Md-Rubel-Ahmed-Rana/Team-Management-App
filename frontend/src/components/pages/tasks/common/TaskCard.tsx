import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import TaskActions from "./TaskActions";
import moment from "moment";
import { FaRegUserCircle } from "react-icons/fa";
import EditTaskModal from "../modals/EditTaskModal";
import TaskStatuses from "../mobile/TaskStatuses";

type Props = {
  task: any;
};

const TaskCard = ({ task }: Props) => {
  const { data } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [showActions, setShowActions] = useState(false);
  const [isEditTask, setIsEditTask] = useState(false);
  return (
    <>
      <div className=" flex justify-between gap-3 items-start relative">
        <span className="text-lg lg:text-xl">{task?.name}</span>
        {(task?.assignedBy?.id === user?.id ||
          task?.assignedTo?.id === user?.id) && (
          <BsThreeDotsVertical
            title="Click to edit/delete task"
            className="cursor-pointer font-semibold text-xl"
            onClick={() => setShowActions((prev) => !prev)}
          />
        )}

        {showActions && (
          <TaskActions
            setIsEditTask={setIsEditTask}
            setShowActions={setShowActions}
            taskId={task?.id}
          />
        )}
      </div>

      <h4>Deadline: {task?.deadline || "No deadline"}</h4>
      <div className="block lg:hidden">
        <TaskStatuses task={task} />
      </div>
      <p className="text-sm text-gray-600">
        Created:
        {moment(task.createdAt).fromNow()}
      </p>
      <div>
        <p>Assigned to: </p>
        <div className="flex items-center gap-2 mt-2 border px-3 py-2 rounded-md">
          {task?.assignedTo?.profile_picture ? (
            <img
              className="h-10 w-10 rounded-full"
              src={task?.assignedTo?.profile_picture}
              alt=""
            />
          ) : (
            <FaRegUserCircle className="h-10 w-10 rounded-full" />
          )}
          <div>
            <h5 className="text-lg  font-medium">{task?.assignedTo?.name}</h5>
            <p className="text-sm">{task?.assignedTo?.designation}</p>
          </div>
        </div>
      </div>
      <p>By: {task?.assignedBy?.name}</p>
      {isEditTask && (
        <EditTaskModal
          isOpen={isEditTask}
          setIsOpen={setIsEditTask}
          task={task}
        />
      )}
    </>
  );
};

export default TaskCard;
