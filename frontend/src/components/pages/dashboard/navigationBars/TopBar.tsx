/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useAssignedProjectsQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";

const TopBar = ({ setActiveView, activeView }: any) => {
  const router = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?.id);
  const { data: assignedProjects } = useAssignedProjectsQuery(user?.id);
  const project =
    projects?.data?.length > 0 ? projects?.data[0] : assignedProjects?.data[0];

  const handleSidebarNavigate = (text: string) => {
    if (text === "projects") {
      router.push({
        pathname: "/projects",
        query: {
          team: project?.team || "unknown",
          id: project?.id || "unknown",
          name: project?.name || "unknown",
        },
      });
    } else {
      setActiveView(text);
      router.push({
        pathname: router.pathname,
        query: { ...router.query, activeView: text },
      });
    }
  };

  useEffect(() => {
    setActiveView(router.query.activeView);
  }, [router.query.activeView]);

  return (
    <div className="flex flex-col gap-2 font-sans font-semibold p-4">
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
            <small>Profile</small>
          </button>
        </option>
        <option selected={activeView === "my-teams"} value="my-teams">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md  text-left focus:outline-none ${
              activeView === "my-teams" && " bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <small> My Teams</small>
          </button>
        </option>
        <option selected={activeView === "invitations"} value="invitations">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none ${
              activeView === "invitations" && "bg-gray-100 dark:bg-gray-600"
            }`}
          >
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
            <small>Leave requests</small>
          </button>
        </option>
        <option selected={activeView === "joined-teams"} value="joined-teams">
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-600  w-full rounded-md  text-left focus:outline-none ${
              activeView === "joined-teams" && "bg-gray-100 dark:bg-gray-600"
            }`}
          >
            <small>Joined Teams</small>
          </button>
        </option>
        <option value={"projects"}>
          <button>
            <Link
              className={`py-2 px-4 flex items-center gap-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-600  w-full rounded-md  text-left focus:outline-none ${
                activeView === "projects" && "bg-gray-100 dark:bg-gray-600"
              }`}
              href={{
                pathname: "/projects",
                query: {
                  team: project?.team || "unknown",
                  id: project?.id || "unknown",
                  name: project?.name || "unknown",
                },
              }}
            >
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
            <small>Payments</small>
          </button>
        </option>
        <option
          selected={activeView === "change-password"}
          value="change-password"
        >
          <button
            className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md text-left focus:outline-none ${
              activeView === "change-password" && "bg-gray-100 dark:bg-gray-600"
            }`}
            onClick={() => handleSidebarNavigate("change-password")}
          >
            <small>Change Password</small>
          </button>
        </option>
      </select>
    </div>
  );
};

export default TopBar;
