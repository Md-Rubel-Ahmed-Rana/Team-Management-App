import React from "react";
import StatusNavButton from "../../components/StatusnavButton";

type Props = {
  todos: number;
  ongoing: number;
  completed: number;
};

const StatusNavbar = ({ todos = 0, ongoing = 0, completed = 0 }: Props) => {
  return (
    <div className="flex flex-col  gap-4">
      <div className="flex justify-between space-x-4">
        <StatusNavButton
          name="Todo"
          style="bg-blue-500 hover:bg-blue-600"
          total={todos}
        />
        <StatusNavButton
          name="Ongoing"
          style="bg-yellow-500 hover:bg-yellow-600"
          total={ongoing}
        />
        <StatusNavButton
          name="Completed"
          style="bg-green-500 hover:bg-green-600"
          total={completed}
        />
      </div>
    </div>
  );
};

export default StatusNavbar;
