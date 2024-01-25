import React from "react";
import HowItWorksCard from "./HowItWorksCard";
import howItWorkData from "@/constants/howItWorkData";

const HowItWorksSection = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">How Team Manager Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {howItWorkData.map((step, index) => (
          <HowItWorksCard key={index} steps={step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
