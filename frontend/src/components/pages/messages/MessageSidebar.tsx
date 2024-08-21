import Link from "next/link";
import { GrProjects, GrResources } from "react-icons/gr";
import { RiMessage2Line } from "react-icons/ri";
import { TbBrandTeams, TbSpeakerphone } from "react-icons/tb";
import { GoHome } from "react-icons/go";
import { BiLogoMicrosoftTeams } from "react-icons/bi";
import { RiWechatChannelsFill } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";

type Props = {
  activeChannel: string;
  setActiveChannel: (value: string) => void;
};

const MessageSidebar = ({ activeChannel, setActiveChannel }: Props) => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;
  return (
    <>
      <aside className="w-1/5 bg-gray-200 flex flex-col h-screen">
        <div className="flex items-center lg:gap-2 p-4 lg:p-4 bg-gray-200 text-gray-800 shadow-md">
          <RiWechatChannelsFill className="text-3xl" />
          <h1 className="hidden lg:block text-sm lg:text-xl font-bold ">
            Channels
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col justify-between h-full">
            <ul className="flex flex-col justify-between gap-2">
              <li className="w-full">
                <button
                  title="Discussion"
                  className={`${
                    activeChannel === "discussion" &&
                    "bg-gray-100 dark:bg-gray-600"
                  }   px-4 py-2 lg:py-3 flex  items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                  onClick={() => setActiveChannel("discussion")}
                >
                  <RiMessage2Line />
                  <small className="hidden lg:block">Discussion</small>
                </button>
              </li>
              <li className="w-full">
                <button
                  title="Announcement"
                  onClick={() => setActiveChannel("announcement")}
                  className={`${
                    activeChannel === "announcement" &&
                    "bg-gray-100 dark:bg-gray-600"
                  }   px-4  py-2 lg:py-3 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                >
                  <TbSpeakerphone />
                  <small className="hidden lg:block">Announcement</small>
                </button>
              </li>
              <li className="w-full">
                <button
                  title="Resources"
                  className={`${
                    activeChannel === "resources" &&
                    "bg-gray-100 dark:bg-gray-600"
                  }   px-4  py-2 lg:py-3 flex   items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                  onClick={() => setActiveChannel("resources")}
                >
                  <GrResources />
                  <small className="hidden lg:block">Resources</small>
                </button>
              </li>
            </ul>
            <div>
              <ul className="flex flex-col justify-between gap-3">
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex   items-center gap-2 text-xl text-gray-700  shadow-md w-full`}
                    href={`/dashboard/profile?${queries}`}
                  >
                    <MdDashboard />
                    <small className="hidden lg:block">Dashboard</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex   items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={"/"}
                  >
                    <GoHome />
                    <small className="hidden lg:block">Home</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex   items-center gap-2 text-xl text-gray-700  shadow-md w-full`}
                    href={`/my-teams?${queries}`}
                  >
                    <TbBrandTeams />
                    <small className="hidden lg:block">My Teams</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex   items-center gap-2 text-xl text-gray-700   shadow-md w-full`}
                    href={`/joined-teams?${queries}`}
                  >
                    <BiLogoMicrosoftTeams />
                    <small className="hidden lg:block">Joined Teams</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex   items-center gap-2 text-xl text-gray-700  shadow-md w-full`}
                    href={`/projects?${queries}`}
                  >
                    <GrProjects />
                    <small className="hidden lg:block">Projects</small>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MessageSidebar;
