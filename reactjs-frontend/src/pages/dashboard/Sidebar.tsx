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
    <div className=" flex flex-col gap-2 w-1/5 font-sans border-r-2 pr-2">
      <button
        className={`py-2 px-4 block w-full hover:bg-gray-100 rounded-md  text-left focus:outline-none ${
          activeView === "profile" && " bg-gray-100"
        }`}
        onClick={() => handleSidebarNavigate("profile")}
      >
        Profile
      </button>
      <button
        className={`py-2 px-4 block w-full hover:bg-gray-100 rounded-md  text-left focus:outline-none ${
          activeView === "my-teams" && " bg-gray-100"
        }`}
        onClick={() => handleSidebarNavigate("my-teams")}
      >
        My Teams
      </button>
      <button
        className={`py-2 px-4 block w-full hover:bg-gray-100 rounded-md  text-left focus:outline-none ${
          activeView === "invitations" && "bg-gray-100"
        }`}
        onClick={() => handleSidebarNavigate("invitations")}
      >
        Invitations
      </button>
      <button
        className={`py-2 px-4 block hover:bg-gray-100 w-full rounded-md  text-left focus:outline-none ${
          activeView === "joined-teams" && "bg-gray-100"
        }`}
        onClick={() => handleSidebarNavigate("joined-teams")}
      >
        Joined Teams
      </button>
      <button>
        <Link
          className={`py-2 px-4 block hover:bg-gray-100 w-full rounded-md  text-left focus:outline-none ${
            activeView === "projects" && "bg-gray-100"
          }`}
          to={"/projects"}
        >
          Projects
        </Link>
      </button>
      <button
        className={`py-2 px-4 block w-full hover:bg-gray-100 rounded-md text-left focus:outline-none ${
          activeView === "payments" && "bg-gray-100"
        }`}
        onClick={() => handleSidebarNavigate("payments")}
      >
        Payments
      </button>
      <button
        className="py-2 px-4 block w-full hover:bg-gray-100 rounded-md  text-left focus:outline-none"
        onClick={handleLogOut}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
