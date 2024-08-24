/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { FaUser, FaRegBell, FaBars, FaRegMoon, FaSun } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import NotificationModal from "../pages/notifications/NotificationModal";
import { useContext, useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery, useLogoutUserMutation } from "@/features/user";
import Link from "next/link";
import { useGetNotificationQuery } from "@/features/notification";
import { INotification } from "@/interfaces/notification.interface";
import { SocketContext } from "@/context/SocketContext";
import Swal from "sweetalert2";
import SmallLoader from "./SmallLoader";

const Navbar = () => {
  const { socket }: any = useContext(SocketContext);
  const { data, isLoading: isUserLoading } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;
  const [logout] = useLogoutUserMutation({});
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { data: notifiedData } = useGetNotificationQuery(user?.id);
  const notifications: INotification[] = notifiedData?.data || [];
  const [unreadNotifications, setUnreadNotifications] = useState<
    INotification[]
  >([]);

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

  useEffect(() => {
    const handleNotification = (data: INotification) => {
      setUnreadNotifications((prev: INotification[]) => [...prev, data]);
    };
    socket?.on("notification", handleNotification);
    return () => {
      socket?.off("notification", handleNotification);
    };
  }, [socket]);

  useEffect(() => {
    const unread = notifications.filter((notified) => !notified.read);
    setUnreadNotifications(unread);
  }, []);

  return (
    <nav className="lg:flex justify-between items-center lg:px-5 py-3 lg:py-5 border-b relative">
      <div>
        <Link className="lg:flex hidden  items-center gap-3" href={"/"}>
          <img
            className="w-18 h-14 rounded-full"
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
              <Link className="m-2" href={`/my-teams?${queries}`}>
                My Teams
              </Link>
              <Link className="m-2" href={`/joined-teams?${queries}`}>
                Joined Teams
              </Link>
              <Link className="m-2" href={`/projects?${queries}`}>
                Projects
              </Link>
            </>
          )}
          {user?.email && (
            <>
              <button
                onClick={() => setIsOpen(true)}
                className="relative m-2 p-2 border-2 rounded-full"
              >
                <FaRegBell />
                <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                  {unreadNotifications?.length || 0}
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

      <div className="flex lg:hidden items-center justify-between px-2 lg:px-5">
        <div>
          {!toggle && (
            <button onClick={() => setToggle(!toggle)}>
              <FaBars className="text-3xl" />
            </button>
          )}
          {toggle && (
            <button onClick={() => setToggle(!toggle)}>
              <BiX className="text-3xl" />
            </button>
          )}
        </div>

        {isUserLoading ? (
          <button className="px-4 lg:hidden block py-2 rounded-lg bg-blue-600 text-white">
            <SmallLoader />
          </button>
        ) : (
          <div className="flex gap-4">
            {!user?.email && (
              <>
                <button onClick={() => setToggle(false)}>
                  <Link href="/login">Login</Link>
                </button>
              </>
            )}

            {user?.email && (
              <button
                onClick={() => {
                  setIsOpen(true);
                  setToggle(false);
                }}
                className="relative  p-2 border-2 rounded-full"
              >
                <FaRegBell />
                <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                  {unreadNotifications?.length || 0}
                </small>
              </button>
            )}

            <div>
              {user?.email && (
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
              )}
            </div>
          </div>
        )}
      </div>
      {toggle && (
        <div className="flex justify-center items-center">
          {isUserLoading ? (
            <button className="px-4 hidden lg:block py-2 rounded-lg bg-blue-600 text-white">
              <SmallLoader />
            </button>
          ) : (
            <div className="w-auto flex lg:hidden rounded-md flex-col text-start gap-3 p-2 z-10 absolute top-12 left-0 shadow-lg bg-gray-200">
              <Link
                onClick={() => setToggle(false)}
                className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                href="/"
              >
                Home
              </Link>
              {!user?.email && (
                <>
                  <Link
                    className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                    onClick={() => setToggle(false)}
                    href="/signup"
                  >
                    Signup
                  </Link>
                  <Link
                    className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                    onClick={() => setToggle(false)}
                    href="/login"
                  >
                    Login
                  </Link>
                </>
              )}

              {user?.email && (
                <>
                  <Link
                    className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                    onClick={() => setToggle(false)}
                    href={`/my-teams?${queries}`}
                  >
                    My Teams
                  </Link>
                  <Link
                    onClick={() => setToggle(false)}
                    className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                    href={`/joined-teams?${queries}`}
                  >
                    Joined Teams
                  </Link>
                  <Link
                    onClick={() => setToggle(false)}
                    className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                    href={`/projects?${queries}`}
                  >
                    Projects
                  </Link>
                  <button
                    className="text-start  w-full  bg-gray-100 shadow-md rounded-sm px-2 py-1 text-md"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {isOpen && (
        <NotificationModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          notifications={notifications}
          unreadNotifications={unreadNotifications}
        />
      )}
    </nav>
  );
};

export default Navbar;
