import { MenuProps } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";

const Dropdown: any = dynamic(() => import("antd/lib/dropdown"), {
  ssr: false,
});
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  queries: string;
};

const TeamDropdown = ({ queries }: Props) => {
  const teamItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`/teams/my-teams?${queries}`}>My Teams</Link>,
    },
    {
      key: "2",
      label: <Link href={`/teams/joined-teams?${queries}`}>Joined Teams</Link>,
    },
  ];
  return (
    <Dropdown menu={{ items: teamItems }} placement="bottom" arrow>
      <Button className="text-lg" type="text">
        Teams
      </Button>
    </Dropdown>
  );
};

export default TeamDropdown;
