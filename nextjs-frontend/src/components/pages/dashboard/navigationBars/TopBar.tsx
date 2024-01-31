/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useAssignedProjectsQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { CgProfile } from "react-icons/cg";
import { TbBrandTeams } from "react-icons/tb";
import {
  MdInsertInvitation,
  MdOutlineLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { GrProjects } from "react-icons/gr";

const TopBar = ({ setActiveView, activeView }: any) => {
  const router = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?._id);
  const { data: assignedProjects } = useAssignedProjectsQuery(user?._id);
  const project =
    projects?.data?.length > 0 ? projects?.data[0] : assignedProjects?.data[0];

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

  useEffect(() => {
    setActiveView(router.query.activeView);
  }, [router.query.activeView]);

  return (
    <div className="flex flex-col gap-2 font-sans font-semibold border-r-2 pr-2">
      <select
        onChange={(e) => handleSidebarNavigate(e.target.value)}
        className="w-full px-4 py-2 border"
        name=""
        id=""
        defaultValue={activeView}
      >
        <option selected={activeView === "profile"} value="profile">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md  text-left focus:outline-none ${
              activeView === "profile" && " bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <CgProfile />
            <small>Profile</small>
          </button>
        </option>
        <option selected={activeView === "my-teams"} value="my-teams">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md  text-left focus:outline-none ${
              activeView === "my-teams" && " bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <TbBrandTeams />
            <small> My Teams</small>
          </button>
        </option>
        <option selected={activeView === "invitations"} value="invitations">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none ${
              activeView === "invitations" && "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <MdInsertInvitation />
            <small>Invitations</small>
          </button>
        </option>
        <option
          selected={activeView === "leave-requests"}
          value="leave-requests"
        >
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none ${
              activeView === "leave-requests" && "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <FcLeave />
            <small>Leave requests</small>
          </button>
        </option>
        <option selected={activeView === "joined-teams"} value="joined-teams">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-600  w-full rounded-md  text-left focus:outline-none ${
              activeView === "joined-teams" && "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <BiLogoMicrosoftTeams />
            <small>Joined Teams</small>
          </button>
        </option>
        <option value="projects">
          <button>
            <Link
              className={`py-2 px-4 flex items-center gap-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-600  w-full rounded-md  text-left focus:outline-none ${
                activeView === "projects" && "bg-gray-100 dark:bg-gray-600"
              }`}
              href={{
                pathname: "/projects",
                query: {
                  team: project?.team || "unknown",
                  id: project?._id || "unknown",
                  name: project?.name || "unknown",
                },
              }}
            >
              <GrProjects />
              <small>Projects</small>
            </Link>
          </button>
        </option>
        <option selected={activeView === "payments"} value="payments">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md text-left focus:outline-none ${
              activeView === "payments" && "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <MdOutlinePayment />
            <small>Payments</small>
          </button>
        </option>
        <option value="logout">
          <button
            className="py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none"
            onClick={handleLogOut}
          >
            <MdOutlineLogout />
            <small>Logout</small>
          </button>
        </option>
      </select>
    </div>
  );
};

export default TopBar;
