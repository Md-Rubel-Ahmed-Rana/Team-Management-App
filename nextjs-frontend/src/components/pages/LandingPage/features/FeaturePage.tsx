import React, { useEffect, useRef } from "react";
import FeatureCard from "./FeatureCard";
import featureData from "@/constants/featureData";
import Link from "next/link";
import { IFeature } from "@/interfaces/feature.interface";

type Props = {
  limit?: number;
};

const FeaturesSection = ({ limit = 3 }: Props) => {
  return (
    <section className="lg:py-16 p-4 text-center">
      <h2 className="lg:text-3xl text-xl font-bold mb-8">
        Powerful Features Tailored for Effective Team Management
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureData.slice(0, limit).map((feature: IFeature, index) => (
          <FeatureCard key={index} feature={feature} />
        ))}
      </div>
      {limit <= 3 && (
        <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-8 hover:bg-blue-700">
          <Link href={"/features"}>Explore Features</Link>
        </button>
      )}
    </section>
  );
};

export default FeaturesSection;
