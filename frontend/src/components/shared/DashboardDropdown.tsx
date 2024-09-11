import { useLoggedInUserQuery, useLogoutUserMutation } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { MenuProps } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";

const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
  loading: () => <FaUser />,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

const DashboardDropdown = () => {
  const { data } = useLoggedInUserQuery({});
  const [logout] = useLogoutUserMutation({});
  const user: IUser = data?.data;
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
      window.location.replace("/login");
    }
  };

  const routes: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`/dashboard/profile?${queries}`}>Profile</Link>,
    },
    {
      key: "2",
      label: (
        <Link href={`/dashboard/invitations?${queries}`}>Invitations</Link>
      ),
    },
    {
      key: "3",
      label: (
        <Link href={`/dashboard/leave-requests?${queries}`}>
          Leave Requests
        </Link>
      ),
    },
    {
      key: "4",
      label: <Link href={`/dashboard/payments?${queries}`}>My Plan</Link>,
    },
    {
      key: "5",
      label: (
        <Link href={`/dashboard/change-password?${queries}`}>
          Change Password
        </Link>
      ),
    },
    {
      key: "6",
      label: (
        <Button
          className="w-full text-start"
          onClick={handleLogOut}
          type="text"
        >
          Logout
        </Button>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{ items: routes }}
      className="cursor-pointer"
      placement="bottomRight"
      arrow
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
    </Dropdown>
  );
};

export default DashboardDropdown;
