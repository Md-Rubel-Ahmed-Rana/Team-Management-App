import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  data: {
    plan: string;
    price: string;
    features: string[];
  };
};

const PricingCard = ({ data }: Props) => {
  const { plan, price, features } = data;
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">{plan}</h3>
      <p className="text-2xl mb-4">{price}</p>
      <ul className="text-left">
        {features.map((feature, index) => (
          <li key={index} className="mb-2 flex items-center gap-3">
            <FaCheckCircle className=" text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-6 hover:bg-blue-700">
        Get Started
      </button>
    </div>
  );
};

export default PricingCard;
