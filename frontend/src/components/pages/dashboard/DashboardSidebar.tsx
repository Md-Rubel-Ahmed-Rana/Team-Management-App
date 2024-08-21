import React from "react";
import Link from "next/link";
import { useLogoutUserMutation } from "@/features/user";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  MdInsertInvitation,
  MdOutlineLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import Swal from "sweetalert2";

const DashboardSidebar = () => {
  const [logout] = useLogoutUserMutation({});

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

  return (
    <ul className="flex flex-col gap-3">
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={"/dashboard/profile"}
        >
          <CgProfile />
          <small className="hidden lg:block">Profile</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={"/dashboard/invitations"}
        >
          <MdInsertInvitation />
          <small className="hidden lg:block">Invitations</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={"/dashboard/leave-requests"}
        >
          <FcLeave />
          <small className="hidden lg:block">Leave requests</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={"/dashboard/payments"}
        >
          <MdOutlinePayment />
          <small className="hidden lg:block">Payments</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={"/dashboard/change-password"}
        >
          <RiLockPasswordFill />
          <small className="hidden lg:block">Change Password</small>
        </Link>
      </li>
      <li className="w-full">
        <button
          className="px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full"
          onClick={handleLogOut}
        >
          <MdOutlineLogout />
          <small>Logout</small>
        </button>
      </li>
    </ul>
  );
};

export default DashboardSidebar;
