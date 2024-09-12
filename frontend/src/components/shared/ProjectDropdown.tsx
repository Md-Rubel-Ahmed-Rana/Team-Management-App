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

const ProjectDropdown = ({ queries }: Props) => {
  const projectItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Link href={`/projects/my-projects?${queries}`}>My Projects</Link>,
    },
    {
      key: "2",
      label: (
        <Link href={`/projects/joined-projects?${queries}`}>
          Joined Projects
        </Link>
      ),
    },
  ];
  return (
    <Dropdown menu={{ items: projectItems }} placement="bottom" arrow>
      <Button className="text-lg" type="text">
        Projects
      </Button>
    </Dropdown>
  );
};

export default ProjectDropdown;
