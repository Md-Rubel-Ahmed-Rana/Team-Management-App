import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaUser, FaRegBell, FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import NotificationModal from "../pages/notifications/NotificationModal";
import { useState } from "react";
import { useLoggedInUserQuery } from "../features/user/userApi";

import { IUser } from "../interfaces/user.interface";

const Navbar = () => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const notifications = [];

  return (
    <nav className="lg:flex justify-between items-center py-5 shadow-sm">
      <div>
        <Link className="lg:flex hidden  items-center gap-3" to={"/"}>
          <img className="w-18 h-14 rounded-full" src={logo} alt="" />
        </Link>
      </div>
      <div className="lg:flex hidden  items-center gap-4">
        <button className="m-2">Availability</button>
        <button className="m-2">Integration</button>
        <button className="m-2">Community</button>
        {!user?.email && (
          <>
            <Link className="m-2" to="/signup">
              Signup
            </Link>
            <Link className="m-2" to="/login">
              Login
            </Link>
          </>
        )}

        {user?.email && (
          <Link className="m-2" to="/teams">
            My Teams
          </Link>
        )}

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
            to={"/dashboard"}
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
            <Link to={"/dashboard"} className="border m-2 p-2 rounded-full">
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
                <Link to="/signup">Signup</Link>
              </button>
              <button>
                <Link to="/login">Login</Link>
              </button>
            </>
          )}

          {user?.email && (
            <button>
              <Link to="/teams">My Teams</Link>
            </button>
          )}
        </div>
      )}
      {isOpen && <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Navbar;
