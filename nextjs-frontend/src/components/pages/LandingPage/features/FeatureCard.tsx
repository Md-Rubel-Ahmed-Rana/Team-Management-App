/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  feature: {
    title: string;
    description: string;
    image?: string;
  };
  limit: number;
};

const FeatureCard = ({ feature, limit }: Props) => {
  const { title, description, image } = feature;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <img className="w-full h-60" src={image} alt={title} />
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
