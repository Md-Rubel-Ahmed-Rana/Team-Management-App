import React from "react";
import TaskCard from "./TaskCard";

const TaskPage = ({
  todosTask = [],
  ongoingTask = [],
  completedTask = [],
}: any) => {
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="flex flex-col gap-3 mt-3  w-1/3 overflow-hidden hover:overflow-auto h-screen scrollbar scrollbar-w-[0px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {todosTask.map((task: any, index: number) => (
          <TaskCard style="" key={index} task={task} />
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-3  w-1/3 overflow-hidden hover:overflow-auto h-screen scrollbar scrollbar-w-[0px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {ongoingTask.map((task: any, index: number) => (
          <TaskCard style="" key={index} task={task} />
        ))}
      </div>
      <div className="flex flex-col gap-3 mt-3  w-1/3 overflow-hidden hover:overflow-auto h-screen scrollbar scrollbar-w-[0px] scrollbar-thumb-blue-600 scrollbar-thin-rounded-md scrollbar-track-slate-100">
        {completedTask.map((task: any, index: number) => (
          <TaskCard style="" key={index} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskPage;
