import React, { Dispatch, SetStateAction, useState } from "react";
import StatusNavButton from "../../components/StatusNavButton";
import CreateTaskModal from "./CreateTaskModal";
import { IProject } from "../../interfaces/project.interface";

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
          style="bg-blue-500 hover:bg-blue-600"
          total={todos}
          onClickHandler={handleOpenTaskModel}
        />
        <StatusNavButton
          name="Ongoing"
          style="bg-yellow-500 hover:bg-yellow-600"
          total={ongoing}
          onClickHandler={handleOpenTaskModel}
        />
        <StatusNavButton
          name="Completed"
          style="bg-green-500 hover:bg-green-600"
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
