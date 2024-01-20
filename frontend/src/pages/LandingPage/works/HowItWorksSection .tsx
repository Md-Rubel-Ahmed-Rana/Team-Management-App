import React from "react";
import howItWorkData from "../../../constants/howItWorkData";
import HowItWorksCard from "./HowItWorksCard";

const HowItWorksSection = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">How Team Manager Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {howItWorkData.map((step) => (
          <HowItWorksCard steps={step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
