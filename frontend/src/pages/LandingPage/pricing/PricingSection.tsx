import React from "react";
import PricingCard from "./PricingCard";
import pricingData from "../../../constants/pricingData";
import { IPrice } from "../../../interfaces/price.interface";

const PricingSection = () => {
  return (
    <section className="bg-white py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Choose the Right Plan for Your Team
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingData.map((price: IPrice, index) => (
          <PricingCard key={index} data={price} />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
