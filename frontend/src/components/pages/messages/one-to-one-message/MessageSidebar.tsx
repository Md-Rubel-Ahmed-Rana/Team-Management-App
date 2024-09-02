import Link from "next/link";
import { GoHome } from "react-icons/go";
import { MdDashboard } from "react-icons/md";
import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { TiMessages } from "react-icons/ti";
import SearchUser from "./SearchUser";
import FriendList from "./FriendList";

const MessageSidebar = () => {
  const { data: userData } = useLoggedInUserQuery({});
  const user: IUser = userData?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;

  return (
    <>
      <aside className="w-1/5 lg:w-2/5 bg-gray-200 flex flex-col h-screen">
        <div className="flex items-center lg:gap-2 p-4 lg:p-4 bg-gray-200 text-gray-800 shadow-md">
          <TiMessages className="text-3xl" />
          <h1 className="hidden lg:block text-sm lg:text-xl font-bold ">
            Messages
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="flex flex-col justify-between h-full">
            <SearchUser />
            <div className="h-[90vh] overflow-y-auto">
              <FriendList />
            </div>
            <div className="mb-16 lg:mb-0">
              <ul className="flex flex-col justify-between gap-3">
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={"/"}
                  >
                    <GoHome />
                    <small className="hidden lg:block">Home</small>
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    className={`px-4 py-2 flex items-center gap-2 text-xl text-gray-700 shadow-md w-full`}
                    href={`/dashboard/profile?${queries}`}
                  >
                    <MdDashboard />
                    <small className="hidden lg:block">Dashboard</small>
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
