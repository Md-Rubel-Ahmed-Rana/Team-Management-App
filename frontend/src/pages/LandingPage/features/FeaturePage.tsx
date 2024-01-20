// FeaturesSection.js
import React from "react";
import FeatureCard from "./FeatureCard";

const FeaturesSection = () => {
  return (
    <section className="py-16 text-center">
      <h2 className="text-3xl font-bold mb-8">
        Powerful Features Tailored for Effective Team Management
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Task and Project Management"
          description="Assign tasks, set deadlines, and track project progress seamlessly."
        />
        <FeatureCard
          title="Communication Hub"
          description="Facilitate real-time communication and collaboration within your team."
        />
        <FeatureCard
          title="Analytics and Reporting"
          description="Gain insights into your team's performance with advanced analytics and reporting tools."
        />
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-8 hover:bg-blue-700">
        Explore Features
      </button>
    </section>
  );
};

export default FeaturesSection;
