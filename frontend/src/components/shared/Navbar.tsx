/* eslint-disable @next/next/no-img-element */
import { FaUser, FaRegBell, FaBars, FaRegMoon, FaSun } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import NotificationModal from "../pages/notifications/NotificationModal";
import { useContext, useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery } from "@/features/user";
import Link from "next/link";
import { useTheme } from "next-themes";
import Cookies from "js-cookie";
import { useGetNotificationQuery } from "@/features/notification";
import { INotification } from "@/interfaces/notification.interface";
import { SocketContext } from "@/context/SocketContext";

const Navbar = () => {
  const { socket }: any = useContext(SocketContext);
  const { theme, setTheme } = useTheme();
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { data: notifiedData } = useGetNotificationQuery(user?._id);
  const notifications: INotification[] = notifiedData?.data || [];
  const [unreadNotifications, setUnreadNotifications] = useState<
    INotification[]
  >([]);
  const unreadNotification = notifications?.filter(
    (notification: INotification) => !notification.read
  );

  const handleLogOut = () => {
    Cookies.remove("tmAccessToken");
    window.location.replace("/");
  };

  useEffect(() => {
    console.log("Notification effect");
    const handleNotification = (data: INotification) => {
      console.log("New notification", data);
      setUnreadNotifications((prev: INotification[]) => [...prev, data]);
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  useEffect(() => {
    setUnreadNotifications(unreadNotification);
  }, [unreadNotification]);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme !== null) {
      setTheme(currentTheme);
    }
  }, [setTheme]);

  return (
    <nav className="lg:flex justify-between items-center py-5 shadow-sm relative">
      <div>
        <Link className="lg:flex hidden  items-center gap-3" href={"/"}>
          <img
            className="w-18 h-14 rounded-full"
            src={"https://i.ibb.co/6r2CN1f/logo.jpg"}
            alt=""
          />
        </Link>
      </div>
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
            <Link className="m-2" href="/teams">
              My Teams
            </Link>
            <Link
              className="m-2"
              href={{
                pathname: "dashboard",
                query: `uId=${user?._id}&activeView=joined-teams`,
              }}
            >
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
              query: { uId: user?._id, activeView: "profile" },
            }}
            className={`${
              !user.profile_picture && "border m-2 p-2 rounded-full"
            }`}
          >
            {user.profile_picture ? (
              <img
                className="w-10 h-10 rounded-full"
                src={user.profile_picture}
                alt=""
              />
            ) : (
              <FaUser />
            )}
          </Link>
        )}
      </div>
      <div className="flex lg:hidden items-center justify-between px-5">
        <div>
          {!toggle && (
            <button onClick={() => setToggle(!toggle)}>
              <FaBars />
            </button>
          )}
          {toggle && (
            <button onClick={() => setToggle(!toggle)}>
              <BiX className="text-xl" />
            </button>
          )}
        </div>

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
                  query: { uId: user?._id, activeView: "profile" },
                }}
                className={`${!user.profile_picture && "border  rounded-full"}`}
              >
                {user.profile_picture ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user.profile_picture}
                    alt=""
                  />
                ) : (
                  <FaUser />
                )}
              </Link>
            )}
          </div>
        </div>
      </div>
      {toggle && (
        <div className="flex lg:hidden flex-col gap-3 z-10 absolute top-20 w-full  p-10 bg-gray-200">
          <button onClick={() => setToggle(false)}>
            <Link href="/">Home</Link>
          </button>
          <button onClick={() => setToggle(false)}>Availability</button>
          <button onClick={() => setToggle(false)}>Integration</button>
          <button onClick={() => setToggle(false)}>Community</button>
          {!user?.email && (
            <>
              <button onClick={() => setToggle(false)}>
                <Link href="/signup">Signup</Link>
              </button>
              <button onClick={() => setToggle(false)}>
                <Link href="/login">Login</Link>
              </button>
            </>
          )}

          {user?.email && (
            <button onClick={() => setToggle(false)}>
              <Link href="/teams">My Teams</Link>
            </button>
          )}
          {user?.email && <button onClick={handleLogOut}>Logout</button>}
        </div>
      )}
      {isOpen && <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Navbar;
