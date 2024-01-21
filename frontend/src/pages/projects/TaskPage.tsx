import React from "react";
import TaskCard from "./TaskCard";

const TaskPage = ({
  todosTask = [],
  ongoingTask = [],
  completedTask = [],
}: any) => {
  // Todo | Ongoing | Completed
  // there should be show assignedMember picture an name
  // there should be show assigner name (manager) as Assigned by:
  // There should be a dropdown button to change status
  // there should be show deadline
  return (
    <div className="flex justify-between gap-4">
      <div className="flex flex-col gap-3 mt-3  w-1/3 overflow-hidden hover:overflow-auto h-screen scrollbar scrollbar-w-[0px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {todosTask.map((task: any, index: number) => (
          <TaskCard
            style="bg-blue-400 hover:bg-blue-500 p-4 rounded-md"
            key={index}
            task={task}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-3  w-1/3 overflow-hidden hover:overflow-auto h-screen scrollbar scrollbar-w-[0px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {ongoingTask.map((task: any, index: number) => (
          <TaskCard
            style="bg-yellow-400 p-4 rounded-md hover:bg-yellow-500"
            key={index}
            task={task}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-3  w-1/3 overflow-hidden hover:overflow-auto h-screen scrollbar scrollbar-w-[0px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {completedTask.map((task: any, index: number) => (
          <TaskCard
            style="bg-green-400  hover:bg-green-500 p-4 rounded-md"
            key={index}
            task={task}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
