import { IPrice } from "@/interfaces/price.interface";
import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  data: IPrice;
};

const PricingCard = ({ data }: Props) => {
  const { id, plan, price, features } = data;
  return (
    <>
      <div
        data-aos="fade-up"
        className="pricing-card p-2 lg:p-6 rounded-lg shadow-md flex flex-col justify-between"
      >
        <div>
          <h3 className="text-xl font-bold mb-4">{plan}</h3>
          <p className="text-2xl mb-4 font-bold">${price} /month</p>
          <ul className="text-left">
            {features.map((feature, index) => (
              <li key={index} className="mb-2 flex items-center gap-3">
                <FaCheckCircle className=" text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <Link
          className="bg-blue-500 text-white py-3 px-4 rounded-full mt-6 hover:bg-blue-700"
          href={`/checkout/${id}?planId=${id}&name=${plan}&features=${features.join(
            ","
          )}`}
        >
          Upgrade Now
        </Link>
      </div>
    </>
  );
};

export default PricingCard;
