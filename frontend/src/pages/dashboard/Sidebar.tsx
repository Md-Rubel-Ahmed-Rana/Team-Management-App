import React from "react";
import { useLoggedInUserQuery } from "../../features/user/userApi";
import { IUser } from "../../interfaces/user.interface";

const Sidebar = ({ setActiveView }: any) => {
  const { data }: any = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  return (
    <div className="bg-gray-400 text-white w-1/5">
      <button
        className="py-2 px-4 block w-full text-left focus:outline-none hover:bg-gray-700"
        onClick={() => setActiveView("profile")}
      >
        Profile
      </button>
      {user.role === "admin" && (
        <button
          className="py-2 px-4 block w-full text-left focus:outline-none hover:bg-gray-700"
          onClick={() => setActiveView("teams")}
        >
          Teams
        </button>
      )}

      <button
        className="py-2 px-4 block w-full text-left focus:outline-none hover:bg-gray-700"
        onClick={() => setActiveView("payments")}
      >
        Payments
      </button>
    </div>
  );
};

export default Sidebar;
