import dynamic from "next/dynamic";
import Link from "next/link";
const Button: any = dynamic(() => import("antd/lib/button"), {
  ssr: false,
});

type IPlan = {
  name: string;
  price: number;
  features: string[];
};

type Props = {
  plan: IPlan;
};

const PlanCard = ({ plan }: Props) => {
  return (
    <div className="p-5 w-full lg:border-r  border-blue-600 flex flex-col justify-between gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold mb-2">Plan</h3>
        <p>Name: {plan?.name}</p>
        <p>Price: {plan?.price} </p>
        <p>Facilities: </p>
        <ul className="list-disc pl-5">
          {plan?.features?.map((feature: string, index: number) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
      <Button
        type="primary"
        className="rounded-md w-full text-white bg-blue-600"
      >
        <Link className="w-full px-5 py-2" href={"/pricing"}>
          See plans
        </Link>
      </Button>
    </div>
  );
};

export default PlanCard;
