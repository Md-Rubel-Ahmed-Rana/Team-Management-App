import React from "react";

const TaskCard = ({ task, style }: any) => {
  const { name, status, assignedMember, assignedBy } = task;

  return (
    <div className={style}>
      <h3>{name}</h3>
      <p>Status: {status}</p>
      <p>Assigned Member: </p>
      <div className="flex items-center gap-2">
        <img
          className="h-10 w-10 rounded-full"
          src={assignedMember?.profile_picture}
          alt=""
        />
        <h5>{assignedMember?.name}</h5>
      </div>
      <p>Assigned by: {assignedBy?.name}</p>
    </div>
  );
};

export default TaskCard;
