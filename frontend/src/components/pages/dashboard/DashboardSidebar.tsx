import React from "react";
import Link from "next/link";
import { useLoggedInUserQuery, useLogoutUserMutation } from "@/features/user";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import {
  MdInsertInvitation,
  MdOutlineLogout,
  MdOutlinePayment,
} from "react-icons/md";
import { FcLeave } from "react-icons/fc";
import Swal from "sweetalert2";
import { IUser } from "@/interfaces/user.interface";

const DashboardSidebar = () => {
  const { data } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const [logout] = useLogoutUserMutation({});
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;

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
          href={`/dashboard/profile?${queries}`}
        >
          <CgProfile />
          <small className="hidden lg:block">Profile</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={`/dashboard/invitations?${queries}`}
        >
          <MdInsertInvitation />
          <small className="hidden lg:block">Invitations</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={`/dashboard/leave-requests?${queries}`}
        >
          <FcLeave />
          <small className="hidden lg:block">Leave requests</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={`/dashboard/payments?${queries}`}
        >
          <MdOutlinePayment />
          <small className="hidden lg:block">Payments</small>
        </Link>
      </li>
      <li className="w-full">
        <Link
          className={`px-4 py-2 flex   items-center gap-2 text-xl   shadow-md w-full`}
          href={`/dashboard/change-password?${queries}`}
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
          <small className="hidden lg:block">Logout</small>
        </button>
      </li>
    </ul>
  );
};

export default DashboardSidebar;
