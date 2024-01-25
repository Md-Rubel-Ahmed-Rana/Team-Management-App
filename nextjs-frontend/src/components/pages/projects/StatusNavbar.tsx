import React, { Dispatch, SetStateAction, useState } from "react";
import CreateTaskModal from "./CreateTaskModal";
import StatusNavButton from "@/components/shared/StatusNavButton";
import { IProject } from "@/interfaces/project.interface";

type Props = {
  todos: number;
  ongoing: number;
  completed: number;
  project: IProject;
};

const StatusNavbar = ({
  todos = 0,
  ongoing = 0,
  completed = 0,
  project,
}: Props) => {
  const [isOpen, setIsOpen] = useState<SetStateAction<boolean>>(false);
  const [selectedTask, setSelectedTask] = useState("");

  const handleOpenTaskModel: any = (task: string) => {
    setSelectedTask(task);
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col  gap-4">
      <div className="flex justify-between space-x-4">
        <StatusNavButton
          name="Todo"
          style=""
          total={todos}
          onClickHandler={handleOpenTaskModel}
        />
        <StatusNavButton
          name="Ongoing"
          style=""
          total={ongoing}
          onClickHandler={handleOpenTaskModel}
        />
        <StatusNavButton
          name="Completed"
          style=""
          total={completed}
          onClickHandler={handleOpenTaskModel}
        />
      </div>
      {isOpen && (
        <CreateTaskModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          project={project}
          task={selectedTask}
        />
      )}
    </div>
  );
};

export default StatusNavbar;
