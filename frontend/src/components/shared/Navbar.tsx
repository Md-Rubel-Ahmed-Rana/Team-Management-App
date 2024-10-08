import { FaRegBell } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery } from "@/features/user";
import Link from "next/link";
import SmallLoader from "./SmallLoader";
import NotificationModal from "../pages/notifications";
import { useGetUnreadNotificationsCountQuery } from "@/features/notification";
import { SocketContext } from "@/context/SocketContext";
import { SiMessenger } from "react-icons/si";
import DashboardDropdown from "./DashboardDropdown";
import NavigationDropdown from "./NavinationDropdown";
import TeamDropdown from "./TeamDropdown";
import ProjectDropdown from "./ProjectDropdown";

const Navbar = () => {
  const { socket }: any = useContext(SocketContext);
  const { data, isLoading: isUserLoading } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;
  const [showNotification, setShowNotification] = useState(false);
  const { data: unreadNotData, isLoading } =
    useGetUnreadNotificationsCountQuery(user?.id);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    setNotificationCount(unreadNotData?.data || 0);
  }, [isLoading]);

  useEffect(() => {
    console.log("Receive new notification");
    const handleMessage = (newNotificationCount: number) => {
      console.log("New notification count:", newNotificationCount);
      setNotificationCount(newNotificationCount);
    };
    socket?.on("notification", handleMessage);
    return () => {
      socket?.off("notification", handleMessage);
    };
  }, [socket]);

  return (
    <div className="sticky top-0 bg-[#f0f8ff] z-50 border-b shadow-md">
      <nav className="lg:flex justify-between items-center p-3  bg-[#f0f8ff] relative">
        {/* nav items for large devices  */}
        <div>
          <Link className="lg:flex hidden  items-center gap-3" href={"/"}>
            <img
              className="w-10 h-10 rounded-full ring-2"
              src={"https://i.ibb.co/6r2CN1f/logo.jpg"}
              alt=""
            />
          </Link>
        </div>
        {isUserLoading ? (
          <button className="px-4 hidden lg:block py-2 rounded-lg bg-blue-600 text-white">
            <SmallLoader />
          </button>
        ) : (
          <div className="lg:flex hidden  items-center gap-4">
            <Link className="m-2" href="/pricing">
              Pricing
            </Link>
            {!user?.email && (
              <>
                <Link className="m-2" href="/signup">
                  Signup
                </Link>
                <Link className="m-2" href="/login">
                  Login
                </Link>
              </>
            )}

            {user?.email && (
              <>
                <TeamDropdown queries={queries} />
                <ProjectDropdown queries={queries} />
                <Link href={"/messages/chats"} className="">
                  <SiMessenger className="text-xl text-blue-600" />
                </Link>
                <button
                  onClick={() => setShowNotification(true)}
                  className="relative  p-2 border-2 rounded-full"
                >
                  <FaRegBell />
                  <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                    {notificationCount}
                  </small>
                </button>
                <DashboardDropdown />
              </>
            )}
          </div>
        )}
        {/* nav items for large devices  */}

        {/* nav items for small devices  */}
        <div className="lg:hidden block">
          <div className="flex items-center justify-between">
            <NavigationDropdown />
            {isUserLoading ? (
              <div className="px-3 py-2 lg:hidden block rounded-lg bg-blue-600 text-white">
                <SmallLoader />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {!user?.email && (
                  <>
                    <Link href="/login">Login</Link>
                    <Link href="/signup">Signup</Link>
                  </>
                )}
                {user?.email && (
                  <>
                    <Link href={"/messages/chats"} className="">
                      <SiMessenger className="text-2xl text-blue-600" />
                    </Link>
                    <button
                      onClick={() => setShowNotification(true)}
                      className="relative  p-2 border-2 rounded-full"
                    >
                      <FaRegBell />
                      <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                        {notificationCount}
                      </small>
                    </button>
                    <DashboardDropdown />
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {showNotification && (
          <NotificationModal
            open={showNotification}
            setOpen={setShowNotification}
          />
        )}
      </nav>
    </div>
  );
};

export default Navbar;
