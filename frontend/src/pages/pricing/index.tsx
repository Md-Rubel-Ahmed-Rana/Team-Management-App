import PricingSection from "@/components/pages/LandingPage/pricing/PricingSection";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import React, { ReactElement } from "react";

const PricingPage = () => {
  return (
    <>
      <GetHead
        title="Pricing: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <PricingSection />
    </>
  );
};

PricingPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default PricingPage;
