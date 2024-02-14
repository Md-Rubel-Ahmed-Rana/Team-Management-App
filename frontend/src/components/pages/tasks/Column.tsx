/* eslint-disable @next/next/no-img-element */
import { useDeleteTaskMutation, useUpdateTaskMutation } from "@/features/task";
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import CreateTaskModal from "./CreateTaskModal";

const Column = ({ column, tasks, project }: any) => {
  const [editedTaskMap, setEditedTaskMap] = useState<{
    [taskId: string]: string;
  }>({});
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleDeleteTask = async (id: string) => {
    const result: any = await deleteTask(id);
    if (result?.data?.success) {
      toast.success(result?.data?.message);
      setEditedTaskMap({});
    }
  };

  const handleEditTask = async (id: string) => {
    const result: any = await updateTask({ id: id, name: editedTaskName });
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }
  };

  return (
    <div className="flex flex-col w-1/3">
      <div className="flex items-center px-4 mb-2">
        <p className="flex justify-between items-center font-semibold border w-full px-4 rounded-md py-1">
          <span>{column?.title}</span>
          <button onClick={() => setIsOpen(true)}>
            <FaPlus />
          </button>
        </p>
      </div>
      {column && (
        <Droppable droppableId={column?.id}>
          {(droppableProvided, droppableSnapshot) => (
            <div
              className="flex flex-col items-center px-4 mb-2"
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {tasks?.map((task: any, index: number) => (
                <Draggable
                  key={task?.id}
                  draggableId={`${task?.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      className={`mb-4 flex flex-col gap-2 p-4 rounded-md shadow-md border w-full`}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      {editedTaskMap[task?.id] !== undefined ? (
                        <div className="flex flex-col gap-2">
                          <input
                            type="text"
                            name="name"
                            defaultValue={task?.name}
                            required
                            id="name"
                            onChange={(e) => setEditedTaskName(e.target.value)}
                            className="w-full rounded-md  border border-[#BCBCBC] placeholder:text-sm placeholder:lg:text-base text-sm placeholder:text-[#7B7B7B]  py-1 outline-none px-2 shadow-sm sm:text-sm"
                          />
                          <div className="flex justify-between">
                            <button
                              onClick={() => handleDeleteTask(task?.id)}
                              className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() =>
                                setEditedTaskMap((prevMap) => ({
                                  ...prevMap,
                                  [task?.id]: undefined,
                                }))
                              }
                              className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleEditTask(task?.id)}
                              className="border px-2 py-1 rounded-md dark:bg-gray-700 bg-gray-200"
                            >
                              Save changes
                            </button>
                          </div>
                          <div>
                            <h4>Deadline: {task?.deadline || "No deadline"}</h4>
                          </div>
                          <div>
                            <p>Assigned to: </p>
                            <div className="flex items-center gap-2 mt-2 border px-3 py-2 rounded-md">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={task?.assignedTo?.profile_picture}
                                alt=""
                              />
                              <div>
                                <h5 className="text-lg  font-medium">
                                  {task?.assignedTo?.name}
                                </h5>
                                <p className="text-sm">
                                  {task?.assignedTo?.designation}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p>By: {task?.assignedBy?.name}</p>
                        </div>
                      ) : (
                        <>
                          <h3
                            title="Click to edit/delete task"
                            onClick={() =>
                              setEditedTaskMap((prevMap) => ({
                                ...prevMap,
                                [task?.id]: task?.name,
                              }))
                            }
                            className="text-xl font-semibold cursor-pointer"
                          >
                            {task?.name}
                          </h3>
                          <div>
                            <h4>Deadline: {task?.deadline || "No deadline"}</h4>
                          </div>
                          <div>
                            <p>Assigned to: </p>
                            <div className="flex items-center gap-2 mt-2 border px-3 py-2 rounded-md">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={task?.assignedTo?.profile_picture}
                                alt=""
                              />
                              <div>
                                <h5 className="text-lg  font-medium">
                                  {task?.assignedTo?.name}
                                </h5>
                                <p className="text-sm">
                                  {task?.assignedTo?.designation}
                                </p>
                              </div>
                            </div>
                          </div>
                          <p>By: {task?.assignedBy?.name}</p>
                        </>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      )}
      {isOpen && (
        <CreateTaskModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          project={project}
          status={column?.title}
        />
      )}
    </div>
  );
};

export default Column;
