import React, { useEffect, useRef } from "react";
import PricingCard from "./PricingCard";
import { IPrice } from "@/interfaces/price.interface";
import { useGetPricingQuery } from "@/features/pricing";
import useCardAnimation from "@/hooks/useCardAnimation";

const PricingSection = () => {
  const { data } = useGetPricingQuery({});
  const pricingData = data?.data;
  const sectionRef = useRef(null);
  const handleAnimation = useCardAnimation();

  useEffect(() => {
    handleAnimation(sectionRef, "pricing-card");
  }, []);
  return (
    <section ref={sectionRef} className="lg:py-16 p-4 text-center">
      <h2 className="lg:text-3xl text-xl font-bold mb-8">
        Choose the Right Plan for Your Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingData?.map((price: IPrice) => (
          <PricingCard key={price?.id} data={price} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
