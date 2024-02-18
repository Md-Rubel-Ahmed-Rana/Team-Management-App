import React from "react";

type Props = {
  steps: {
    step: string;
    title: string;
    description: string;
  };
};

const HowItWorksCard = ({ steps }: Props) => {
  const { step, title, description } = steps;
  return (
    <div className="how-it-works-card p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default HowItWorksCard;
