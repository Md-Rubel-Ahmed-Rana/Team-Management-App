import React from "react";
import { FaPlus } from "react-icons/fa";

type Props = {
  name: string;
  total: number;
  style: string;
};

const StatusNavButton = ({ name, total, style }: Props) => {
  return (
    <div
      className={`w-full flex items-center justify-between px-4 py-2 text-white rounded-md ${style}`}
    >
      <span>
        {name} - {total}
      </span>
      <button>
        <FaPlus />
      </button>
    </div>
  );
};

export default StatusNavButton;
