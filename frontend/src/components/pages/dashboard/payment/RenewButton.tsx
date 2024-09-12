import { PackageDetail } from "@/interfaces/package.interface";
import dynamic from "next/dynamic";
import { RiErrorWarningLine } from "react-icons/ri";
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  pkg: PackageDetail;
};

const RenewButton = ({ pkg }: Props) => {
  console.log("Package to renew", pkg);
  return (
    <Button
      title="Renewing this plan will replace your current one. The team, project, and member limits of the new plan will apply."
      type="primary"
      className={`px-5 py-2 rounded-md w-full flex gap-4 text-white bg-blue-600`}
    >
      <span>Renew Plan</span>
      <RiErrorWarningLine title="Renewing this plan will replace your current one. The team, project, and member limits of the new plan will apply." />
    </Button>
  );
};

export default RenewButton;
