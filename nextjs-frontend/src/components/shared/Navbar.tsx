/* eslint-disable @next/next/no-img-element */
import { FaUser, FaRegBell, FaBars, FaRegMoon, FaSun } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import NotificationModal from "../pages/notifications/NotificationModal";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/user.interface";
import { useLoggedInUserQuery } from "@/features/user";
import Link from "next/link";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const notifications = [];

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme !== null) {
      setTheme(currentTheme);
    }
  }, [setTheme]);

  return (
    <nav className="lg:flex justify-between items-center py-5 shadow-sm">
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
        <button className="m-2">Availability</button>
        <button className="m-2">Integration</button>
        <button className="m-2">Community</button>
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
          <Link className="m-2" href="/teams">
            My Teams
          </Link>
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
              {notifications?.length || 0}
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
        <div className="flex">
          {user?.email && (
            <button
              onClick={() => setIsOpen(true)}
              className="relative m-2 p-2 border-2 rounded-full"
            >
              <FaRegBell />
              <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                {notifications?.length || 0}
              </small>
            </button>
          )}

          {user?.email && (
            <Link href={"/dashboard"} className="border m-2 p-2 rounded-full">
              <FaUser />
            </Link>
          )}
        </div>
      </div>
      {toggle && (
        <div className="flex lg:hidden flex-col gap-3 ">
          <button>Availability</button>
          <button>Integration</button>
          <button>Community</button>
          {!user?.email && (
            <>
              <button>
                <Link href="/signup">Signup</Link>
              </button>
              <button>
                <Link href="/login">Login</Link>
              </button>
            </>
          )}

          {user?.email && (
            <button>
              <Link href="/teams">My Teams</Link>
            </button>
          )}
        </div>
      )}
      {isOpen && <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Navbar;
