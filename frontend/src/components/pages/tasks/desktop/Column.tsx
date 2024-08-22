/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { FaPlus } from "react-icons/fa";
import CreateTaskModal from "../modals/CreateTaskModal";
import TaskCard from "../common/TaskCard";

const Column = ({ column, tasks, project }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-1/3">
      <div className="flex items-center px-2 mb-2">
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
              className="flex flex-col items-center px-2 mb-2"
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
                      <TaskCard task={task} />
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
