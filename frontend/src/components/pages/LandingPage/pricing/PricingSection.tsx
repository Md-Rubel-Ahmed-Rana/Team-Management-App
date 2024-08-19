import React, { useEffect, useRef } from "react";
import PricingCard from "./PricingCard";
import { IPrice } from "@/interfaces/price.interface";
import { useGetPricingQuery } from "@/features/pricing";

const PricingSection = () => {
  const { data, isLoading } = useGetPricingQuery({});
  const pricingData = data?.data;
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="lg:py-16 p-4 text-center">
      <h2 className="lg:text-3xl text-xl font-bold mb-8">
        Choose the Right Plan for Your Team
      </h2>
      {isLoading ? (
        <div className="text-center">
          <span className="text-lg lg:text-xl bg-blue-500 px-5 py-3 text-white rounded-md font-semibold text-center">
            Loading pricing plans...
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingData?.map((price: IPrice) => (
            <PricingCard key={price?.id} data={price} />
          ))}
        </div>
      )}
    </section>
  );
};

export default PricingSection;
