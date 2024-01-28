import FeaturesSection from "@/components/pages/LandingPage/features/FeaturePage";
import RootLayout from "@/layout/RootLayout";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const FeaturesPage: NextPageWithLayout = () => {
  return (
    <div>
      <FeaturesSection limit={1000} />
    </div>
  );
};

export default FeaturesPage;

FeaturesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
