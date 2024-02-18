/* eslint-disable @next/next/no-img-element */
import { IFeature } from "@/interfaces/feature.interface";
import React from "react";

type Props = {
  feature: IFeature;
};

const FeatureCard = ({ feature }: Props) => {
  const { title, description, image } = feature;
  return (
    <div className="features-card p-6 rounded-lg shadow-md lg:flex flex-col gap-4">
      <img className="w-full h-60 rounded-lg" src={image} alt={title} />
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default FeatureCard;
