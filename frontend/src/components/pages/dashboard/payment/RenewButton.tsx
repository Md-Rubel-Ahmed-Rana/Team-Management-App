import { useRenewPackageMutation } from "@/features/payment";
import { PackageDetail } from "@/interfaces/package.interface";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { RiErrorWarningLine } from "react-icons/ri";
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});
const Popover: any = dynamic(() => import("antd/lib/popover"), {
  ssr: false,
});

type Props = {
  pkg: PackageDetail;
};

const RenewButton = ({ pkg }: Props) => {
  const [renewPackage] = useRenewPackageMutation();

  const handleRenewPackage = async () => {
    const newData = {
      userId: pkg.payment.user,
      planId: pkg.plan.id,
      packageId: pkg.id,
    };
    const result: any = await renewPackage(newData);
    if (result?.data?.data?.url) {
      window.location.href = result?.data?.data?.url;
    } else {
      toast.error(
        result?.error?.data?.message ||
          result?.data?.message ||
          "Failed to renew your package. Please try again"
      );
    }
  };
  return (
    <Button
      onClick={handleRenewPackage}
      type="primary"
      className={`px-5 py-2 rounded-md w-full flex gap-4 text-white bg-blue-600`}
    >
      <span>Renew Plan</span>
      <Popover content="Renewing this plan will replace your current one. The team, project, and member limits of the new plan will apply.">
        <RiErrorWarningLine />
      </Popover>
    </Button>
  );
};

export default RenewButton;
