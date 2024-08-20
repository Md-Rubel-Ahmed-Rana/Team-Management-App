/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { FaUser, FaRegBell, FaBars, FaRegMoon, FaSun } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import NotificationModal from "../pages/notifications/NotificationModal";
import { useContext, useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery, useLogoutUserMutation } from "@/features/user";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useGetNotificationQuery } from "@/features/notification";
import { INotification } from "@/interfaces/notification.interface";
import { SocketContext } from "@/context/SocketContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const { socket }: any = useContext(SocketContext);
  const { theme, setTheme } = useTheme();
  const { data, isLoading: isUserLoading } = useLoggedInUserQuery({});
  const [logout] = useLogoutUserMutation({});
  const user: IUser = data?.data;
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
    <nav className="lg:flex justify-between items-center py-5  relative">
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
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
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
              <Link className="m-2" href={"/my-teams"}>
                My Teams
              </Link>
              <Link className="m-2" href={"/joined-teams"}>
                Joined Teams
              </Link>
              <Link className="m-2" href="/projects">
                Projects
              </Link>
            </>
          )}

          <button
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            {theme === "dark" ? <FaSun /> : <FaRegMoon />}
          </button>

          {user?.email && (
            <button
              onClick={() => setIsOpen(true)}
              className="relative m-2 p-2 border-2 rounded-full"
            >
              <FaRegBell />
              <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                {unreadNotifications?.length || 0}
              </small>
            </button>
          )}

          {user?.email && (
            <Link
              href={{
                pathname: "/dashboard",
                query: { uId: user?.id, activeView: "profile" },
              }}
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
          )}
        </div>
      )}

      <div className="flex lg:hidden items-center justify-between px-5">
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
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={() =>
                theme == "dark" ? setTheme("light") : setTheme("dark")
              }
            >
              {theme === "dark" ? <FaSun /> : <FaRegMoon />}
            </button>
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
                  href={{
                    pathname: "/dashboard",
                    query: { uId: user?.id, activeView: "profile" },
                  }}
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
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            </button>
          ) : (
            <div className="w-[90%] flex lg:hidden rounded-md flex-col text-start gap-3 z-10 absolute top-20 p-3 shadow-lg dark:bg-gray-700 bg-gray-100">
              <Link
                onClick={() => setToggle(false)}
                className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
                href="/"
              >
                Home
              </Link>
              {!user?.email && (
                <>
                  <Link
                    className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
                    onClick={() => setToggle(false)}
                    href="/signup"
                  >
                    Signup
                  </Link>
                  <Link
                    className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
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
                    className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
                    onClick={() => setToggle(false)}
                    href={"/my-teams"}
                  >
                    My Teams
                  </Link>

                  <Link
                    onClick={() => setToggle(false)}
                    className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
                    href={"/joined-teams"}
                  >
                    Joined Teams
                  </Link>

                  <Link
                    onClick={() => setToggle(false)}
                    className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
                    href="/projects"
                  >
                    Projects
                  </Link>
                  <button
                    className="text-start  w-full dark:bg-gray-800 bg-gray-200 shadow-md rounded-md p-3 text-md font-semibold"
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
