import React from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAssignedProjectsQuery, useMyProjectsQuery } from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";

const Sidebar = ({ setActiveView, activeView }: any) => {
  const router = useRouter()
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const {data: projects} = useMyProjectsQuery(user?._id)
  const {data: assignedProjects} = useAssignedProjectsQuery(user?._id)
  const project = projects?.data?.length > 0 ? projects?.data[0] : assignedProjects?.data[0]

   const handleSidebarNavigate = (text: string) => {
    setActiveView(text);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, activeView: text },
    });
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
        className={`py-2 px-4 block w-full hover:bg-gray-100 rounded-md  text-left focus:outline-none ${
          activeView === "leave-requests" && "bg-gray-100"
        }`}
        onClick={() => handleSidebarNavigate("leave-requests")}
      >
        Leave requests
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

          href={{
                pathname: "/projects",
                query: { team: project?.team || "unknown", id: project?._id || "unknown", name: project?.name || "unknown"},
              }}
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
