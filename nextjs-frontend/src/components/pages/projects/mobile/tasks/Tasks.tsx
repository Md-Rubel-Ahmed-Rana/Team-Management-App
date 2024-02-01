import React, { useState } from "react";
import TaskMobileCard from "./TaskMobileCard";
import TaskStatusNav from "./TaskStatusNav";

const Tasks = () => {
  const [activeStatus, setActiveStatus] = useState("Todo");
  const todoTasksArray = [1, 2, 3, 4, 5, 6];
  const ongoingTasksArray = [1, 2, 3];
  const completedTasksArray = [1];
  return (
    <div>
      <TaskStatusNav
        activeStatus={activeStatus}
        setActiveStatus={setActiveStatus}
      />
      <div className="flex flex-col gap-2">
        {activeStatus === "Todo" && (
          <>
            {todoTasksArray.map((task) => (
              <TaskMobileCard key={Math.random()} />
            ))}
          </>
        )}
        {activeStatus === "Ongoing" && (
          <>
            {ongoingTasksArray.map((task) => (
              <TaskMobileCard key={Math.random()} />
            ))}
          </>
        )}
        {activeStatus === "Completed" && (
          <>
            {completedTasksArray.map((task) => (
              <TaskMobileCard key={Math.random()} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Tasks;
