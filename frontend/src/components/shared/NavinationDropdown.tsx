import { useLoggedInUserQuery } from "@/features/user";
import { IUser } from "@/interfaces/user.interface";
import { MenuProps } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
  loading: () => <FaBars className="text-2xl" />,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

const NavigationDropdown = () => {
  const { data } = useLoggedInUserQuery({});
  const user: IUser = data?.data;
  const queries = `userId=${user?.id}&name=${user?.name}&email=${user?.email}`;

  const universalItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={"/docs/guides"}>Guides</Link>,
    },
    {
      key: "2",
      label: <Link href={"/docs/apis"}>APIs</Link>,
    },
    {
      key: "10",
      label: <Link href={"/pricing"}>Pricing</Link>,
    },
  ];

  const publicItems: MenuProps["items"] = [
    {
      key: "4",
      label: <Link href={"/login"}>Login</Link>,
    },
    {
      key: "3",
      label: <Link href={"/signup"}>Signup</Link>,
    },
    {
      key: "9",
      label: <Link href={"/"}>Home</Link>,
    },
  ];

  const teamItems: MenuProps["items"] = [
    {
      key: "5",
      label: <Link href={`/teams/my-teams?${queries}`}>My Teams</Link>,
    },
    {
      key: "6",
      label: <Link href={`/teams/joined-teams?${queries}`}>Joined Teams</Link>,
    },
  ];

  const projectItems: MenuProps["items"] = [
    {
      key: "7",
      label: <Link href={`/projects/my-projects?${queries}`}>My Projects</Link>,
    },
    {
      key: "8",
      label: (
        <Link href={`/projects/joined-projects?${queries}`}>
          Joined Projects
        </Link>
      ),
    },
  ];

  const navItemsForMobile = universalItems.concat(
    user ? [publicItems[2]] : publicItems,
    user && projectItems.reverse(),
    user && teamItems.reverse()
  );
  return (
    <Dropdown
      menu={{ items: navItemsForMobile.reverse() }}
      placement="bottomLeft"
      arrow
      className="p-0"
    >
      <Button type="text">
        <FaBars className="text-2xl" />
      </Button>
    </Dropdown>
  );
};

export default NavigationDropdown;
