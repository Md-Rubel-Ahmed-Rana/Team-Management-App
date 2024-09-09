import { FaUser, FaRegBell, FaBars } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery } from "@/features/user";
import Link from "next/link";
import SmallLoader from "./SmallLoader";
import type { MenuProps } from "antd";
import dynamic from "next/dynamic";
import NotificationModal from "../pages/notifications";
import { useGetUnreadNotificationsCountQuery } from "@/features/notification";
import { SocketContext } from "@/context/SocketContext";
import { SiMessenger } from "react-icons/si";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
  loading: () => <FaBars className="text-2xl" />,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
  loading: () => <FaBars className="text-2xl" />,
});

const Navbar = () => {
  const { socket }: any = useContext(SocketContext);
  const { data, isLoading: isUserLoading } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;
  const [showNotification, setShowNotification] = useState(false);
  const { data: unreadNotData, isLoading } =
    useGetUnreadNotificationsCountQuery(user?.id);
  const [notificationCount, setNotificationCount] = useState(0);

  const universalItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/docs/guides"}>Guides</Link>,
    },
    {
      key: "2",
      label: <Link href={"/docs/apis"}>APIs</Link>,
    },
  ];

  const publicItems: MenuProps["items"] = [
    {
      key: "4",
      label: <Link href={"/login"}>Login</Link>,
    },
    {
      key: "3",
      label: <Link href={"/signup"}>Signup</Link>,
    },
    {
      key: "9",
      label: <Link href={"/"}>Home</Link>,
    },
  ];

  const teamItems: MenuProps["items"] = [
    {
      key: "5",
      label: <Link href={`/teams/my-teams?${queries}`}>My Teams</Link>,
    },
    {
      key: "6",
      label: <Link href={`/teams/joined-teams?${queries}`}>Joined Teams</Link>,
    },
  ];

  const projectItems: MenuProps["items"] = [
    {
      key: "7",
      label: <Link href={`/projects/my-projects?${queries}`}>My Projects</Link>,
    },
    {
      key: "8",
      label: (
        <Link href={`/projects/joined-projects?${queries}`}>
          Joined Projects
        </Link>
      ),
    },
  ];

  const navItemsForMobile = universalItems.concat(
    user ? [publicItems[2]] : publicItems,
    user && projectItems.reverse(),
    user && teamItems.reverse()
  );

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
                <Dropdown
                  menu={{ items: teamItems.reverse() }}
                  placement="bottom"
                  arrow
                >
                  <Button className="text-lg" type="text">
                    Teams
                  </Button>
                </Dropdown>
                <Dropdown
                  menu={{ items: projectItems.reverse() }}
                  placement="bottom"
                  arrow
                >
                  <Button className="text-lg" type="text">
                    Projects
                  </Button>
                </Dropdown>
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

                <Link
                  href={`/dashboard/profile?${queries}`}
                  className={`${
                    !user?.profile_picture && "border m-2 p-2 rounded-full"
                  }`}
                >
                  {user?.profile_picture ? (
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user?.profile_picture}
                      alt=""
                    />
                  ) : (
                    <FaUser />
                  )}
                </Link>
              </>
            )}
          </div>
        )}
        {/* nav items for large devices  */}

        {/* nav items for small devices  */}
        <div className="lg:hidden block">
          <div className="flex items-center justify-between">
            <Dropdown
              menu={{ items: navItemsForMobile.reverse() }}
              placement="bottomLeft"
              arrow
              className="p-0"
            >
              <Button type="text">
                <FaBars className="text-2xl" />
              </Button>
            </Dropdown>
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
                    <Link
                      href={`/dashboard/profile?${queries}`}
                      className={`${
                        !user?.profile_picture && "border  rounded-full"
                      }`}
                    >
                      {user?.profile_picture ? (
                        <img
                          className="w-10 h-10 rounded-full"
                          src={user?.profile_picture}
                          alt=""
                        />
                      ) : (
                        <FaUser />
                      )}
                    </Link>
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
