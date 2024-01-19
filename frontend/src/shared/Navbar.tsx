import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import logo from "../assets/m.png";
import moskot from "../assets/moskot.png";
import { FaUser, FaRegBell, FaBars } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import NotificationModal from "../pages/notifications/NotificationModal";
import { SocketContext } from "../context/SocketContext";

const Navbar = () => {
  const user: any = useAppSelector((state) => state.user.user);
  const socket: any = useContext(SocketContext);

  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    window.location.replace("/");
  };

  useEffect(() => {
    socket.on("receiveNotification", (data: any) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <nav className="lg:flex justify-between items-center py-5">
      <div className="lg:flex hidden lg:block items-center gap-3">
        <img src={logo} alt="" />
        <img src={moskot} alt="" />
      </div>
      <div className="lg:flex hidden lg:block items-center gap-4">
        <button className="m-2">Availability</button>
        <button className="m-2">Integration</button>
        <button className="m-2">Community</button>
        {!user?.username && (
          <>
            <Link className="m-2" to="/signup">
              Signup
            </Link>
            <Link className="m-2" to="/login">
              Login
            </Link>
          </>
        )}
        {user?.username && (
          <button className="m-2" onClick={handleLogOut}>
            Logout
          </button>
        )}

        {user?.username && (
          <Link className="m-2" to="/team-members">
            My Team
          </Link>
        )}

        {user?.username && (
          <button
            onClick={() => setIsOpen(true)}
            className="relative m-2 p-2 border-2 rounded-full"
          >
            <FaRegBell />
            <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
              {user?.notifications?.length ? user?.notifications?.length : 0}
            </small>
          </button>
        )}

        {user?.username && (
          <Link to="/dashboard" className="border m-2 p-2 rounded-full">
            <FaUser />
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
          {user?.username && (
            <button
              onClick={() => setIsOpen(true)}
              className="relative m-2 p-2 border-2 rounded-full"
            >
              <FaRegBell />
              <small className="absolute -top-1 -right-1 text-sm text-white bg-blue-500 px-1 rounded-full">
                {user?.notifications?.length ? user?.notifications?.length : 0}
              </small>
            </button>
          )}

          {user?.username && (
            <Link to="/dashboard" className="border m-2 p-2 rounded-full">
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
          {!user?.username && (
            <>
              <button>
                <Link to="/signup">Signup</Link>
              </button>
              <button>
                <Link to="/login">Login</Link>
              </button>
            </>
          )}
          {user?.username && <button onClick={handleLogOut}>Logout</button>}

          {user?.username && (
            <button>
              <Link to="/team-members">My Team</Link>
            </button>
          )}
        </div>
      )}
      {isOpen && <NotificationModal isOpen={isOpen} setIsOpen={setIsOpen} />}
    </nav>
  );
};

export default Navbar;
