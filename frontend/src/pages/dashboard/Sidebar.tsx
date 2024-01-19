import React from "react";

const Sidebar = ({ setActiveView }: any) => {
  return (
    <div className="bg-gray-800 text-white w-1/5">
      <button
        className="py-2 px-4 block w-full text-left focus:outline-none hover:bg-gray-700"
        onClick={() => setActiveView("teams")}
      >
        Teams
      </button>
      <button
        className="py-2 px-4 block w-full text-left focus:outline-none hover:bg-gray-700"
        onClick={() => setActiveView("profile")}
      >
        Profile
      </button>
    </div>
  );
};

export default Sidebar;
