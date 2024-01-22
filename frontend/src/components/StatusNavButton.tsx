import { FaPlus } from "react-icons/fa";

type Props = {
  name: string;
  total: number;
  style: string;
  onClickHandler: any;
};

const StatusNavButton = ({ name, total, style, onClickHandler }: Props) => {
  const handleClick = () => {
    onClickHandler(name);
  };

  return (
    <div
      className={`w-full flex items-center justify-between px-4 py-2 text-white rounded-md ${style}`}
    >
      <span>
        {name} - {total}
      </span>
      <button onClick={handleClick}>
        <FaPlus />
      </button>
    </div>
  );
};

export default StatusNavButton;
