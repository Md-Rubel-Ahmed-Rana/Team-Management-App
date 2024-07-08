import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  useAssignedProjectsQuery,
  useMyProjectsQuery,
} from "@/features/project";
import { useLoggedInUserQuery, useLogoutUserMutation } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { CgProfile } from "react-icons/cg";
import { TbBrandTeams } from "react-icons/tb";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  MdInsertInvitation,
  MdOutlineLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { GrProjects } from "react-icons/gr";
import Swal from "sweetalert2";

const Sidebar = ({ setActiveView, activeView }: any) => {
  const router = useRouter();
  const { data: userData } = useLoggedInUserQuery({});
  const [logout] = useLogoutUserMutation({});
  const user: IUser = userData?.data;
  const { data: projects } = useMyProjectsQuery(user?.id);
  const { data: assignedProjects } = useAssignedProjectsQuery(user?.id);
  const project =
    projects?.data?.length > 0 ? projects?.data[0] : assignedProjects?.data[0];

  const handleSidebarNavigate = (text: string) => {
    setActiveView(text);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, activeView: text },
    });
  };

  const handleLogOut = async () => {
    const res: any = await logout("");
    if (res?.data?.statusCode === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: res?.data?.message,
        showConfirmButton: false,
      });
      window.location.replace("/");
    }
  };

  return (
    <div className="flex flex-col gap-2  font-sans font-semibold border-r-2 pr-2">
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md  text-left focus:outline-none ${
          activeView === "profile" && " bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("profile")}
      >
        <CgProfile />
        <small>Profile</small>
      </button>
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md  text-left focus:outline-none ${
          activeView === "my-teams" && " bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("my-teams")}
      >
        <TbBrandTeams />
        <small> My Teams</small>
      </button>
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none ${
          activeView === "invitations" && "bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("invitations")}
      >
        <MdInsertInvitation />
        <small>Invitations</small>
      </button>
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none ${
          activeView === "leave-requests" && "bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("leave-requests")}
      >
        <FcLeave />
        <small>Leave requests</small>
      </button>
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl hover:bg-gray-100 dark:hover:bg-gray-600  w-full rounded-md  text-left focus:outline-none ${
          activeView === "joined-teams" && "bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("joined-teams")}
      >
        <BiLogoMicrosoftTeams />
        <small>Joined Teams</small>
      </button>
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
          <GrProjects />
          <small>Projects</small>
        </Link>
      </button>
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md text-left focus:outline-none ${
          activeView === "payments" && "bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("payments")}
      >
        <MdOutlinePayment />
        <small>Payments</small>
      </button>
      <button
        className={`py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md text-left focus:outline-none ${
          activeView === "change-password" && "bg-gray-100 dark:bg-gray-600"
        }`}
        onClick={() => handleSidebarNavigate("change-password")}
      >
        <RiLockPasswordFill />
        <small>Change Password</small>
      </button>
      <button
        className="py-2 px-4 flex items-center gap-2 text-xl w-full hover:bg-gray-100 dark:hover:bg-gray-600  rounded-md  text-left focus:outline-none"
        onClick={handleLogOut}
      >
        <MdOutlineLogout />
        <small>Logout</small>
      </button>
    </div>
  );
};

export default Sidebar;
