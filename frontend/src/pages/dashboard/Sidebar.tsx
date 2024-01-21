import React from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Sidebar = ({ setActiveView, activeView }: any) => {
  const handleSidebarNavigate = (text: string) => {
    setActiveView(text);
  };
  const handleLogOut = () => {
    Cookies.remove("tmAccessToken");
    window.location.replace("/");
  };

  return (
    <div className="bg-gray-400 flex flex-col gap-2 text-white w-1/5">
      <button
        className={`py-2 px-4 block w-full text-left focus:outline-none ${
          activeView === "profile" ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
        onClick={() => handleSidebarNavigate("profile")}
      >
        Profile
      </button>
      <button
        className={`py-2 px-4 block w-full text-left focus:outline-none ${
          activeView === "my-teams" ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
        onClick={() => handleSidebarNavigate("my-teams")}
      >
        My Teams
      </button>
      <button
        className={`py-2 px-4 block w-full text-left focus:outline-none ${
          activeView === "joined-teams" ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
        onClick={() => handleSidebarNavigate("joined-teams")}
      >
        Joined Teams
      </button>

      <button>
        <Link
          className={`py-2 px-4 block w-full text-left focus:outline-none ${
            activeView === "projects" ? "bg-gray-700" : "hover:bg-gray-700"
          }`}
          to={"/projects"}
        >
          Projects
        </Link>
      </button>
      <button
        className={`py-2 px-4 block w-full text-left focus:outline-none ${
          activeView === "payments" ? "bg-gray-700" : "hover:bg-gray-700"
        }`}
        onClick={() => handleSidebarNavigate("payments")}
      >
        Payments
      </button>
      <button
        className="py-2 px-4 block w-full text-left focus:outline-none  hover:bg-gray-700"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
