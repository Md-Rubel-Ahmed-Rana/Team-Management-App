import React, { useEffect, useRef } from "react";
import HowItWorksCard from "./HowItWorksCard";
import howItWorkData from "@/constants/howItWorkData";
import useCardAnimation from "@/hooks/useCardAnimation";

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const handleAnimation = useCardAnimation();

  // useEffect(() => {
  //   handleAnimation(sectionRef, "how-it-works-card", "right-to-left");
  // }, []);

  return (
    <section ref={sectionRef} className="lg:py-16 p-4 text-center">
      <h2 className="lg:text-3xl text-xl font-bold mb-8">
        How Team Manager Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {howItWorkData.map((step, index) => (
          <HowItWorksCard key={index} steps={step} />
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
