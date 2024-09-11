import { IPayment } from "@/interfaces/package.interface";
import dynamic from "next/dynamic";
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type Props = {
  payment: IPayment;
  planName: string;
};

const PaymentCard = ({ payment, planName }: Props) => {
  const handleRepay = () => {
    window.location.href = payment?.sessionUrl;
  };
  return (
    <div className="p-5 w-full lg:border-r  border-blue-600 flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold  mb-2">Payment status</h3>
        <p>Payment for: {planName} </p>
        <p>Amount: {payment?.paymentAmount} </p>
        <p>Issues: {new Date(payment?.createdAt)?.toDateString()} </p>
        <p>Last updated: {new Date(payment?.updatedAt)?.toDateString()} </p>
        <p>Status: {payment?.status} </p>
      </div>
      {payment?.status === "success" ? (
        <Button
          onClick={handleRepay}
          type="default"
          className={`px-5 py-2 rounded-md w-full text-white bg-green-600
                `}
        >
          Payment success
        </Button>
      ) : (
        <Button
          onClick={handleRepay}
          type="primary"
          className={`px-5 py-2 rounded-md w-full text-white bg-blue-600
                `}
        >
          Try again
        </Button>
      )}
    </div>
  );
};

export default PaymentCard;
