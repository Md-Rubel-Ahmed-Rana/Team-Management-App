import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const TaskStatusNav = ({ activeStatus, setActiveStatus, setIsOpen }: any) => {
  return (
    <div className="flex justify-between items-center gap-2 mb-4">
      <p
        onClick={() => setActiveStatus("Todo")}
        className={`w-1/3 px-2 py-1 border rounded-sm  flex items-center justify-between ${
          activeStatus === "Todo" && "bg-gray-200 dark:bg-gray-600"
        }`}
      >
        <button className="w-full text-left text-sm">Todo</button>
        <button onClick={() => setIsOpen(true)}>
          <FaPlus />
        </button>
      </p>
      <p
        onClick={() => setActiveStatus("Ongoing")}
        className={`w-1/3 px-2 py-1 border rounded-sm  flex items-center justify-between ${
          activeStatus === "Ongoing" && "bg-gray-200 dark:bg-gray-600"
        }`}
      >
        <button className="w-full text-left text-sm">Ongoing</button>
        <button onClick={() => setIsOpen(true)}>
          <FaPlus />
        </button>
      </p>
      <p
        onClick={() => setActiveStatus("Completed")}
        className={`w-1/3 px-2 py-1 border rounded-sm  flex items-center justify-between ${
          activeStatus === "Completed" && "bg-gray-200 dark:bg-gray-600"
        }`}
      >
        <button className="w-full text-left text-sm">Completed</button>
        <button onClick={() => setIsOpen(true)}>
          <FaPlus />
        </button>
      </p>
    </div>
  );
};

export default TaskStatusNav;
