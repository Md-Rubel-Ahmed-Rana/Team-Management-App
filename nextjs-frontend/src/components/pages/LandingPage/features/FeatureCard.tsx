import React from "react";

type Props = {
  feature: {
    title: string;
    description: string;
  };
};

const FeatureCard = ({ feature }: Props) => {
  const { title, description } = feature;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
