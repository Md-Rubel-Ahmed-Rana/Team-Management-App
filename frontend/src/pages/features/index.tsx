import FeaturesSection from "@/components/pages/LandingPage/features/FeaturePage";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { NextPageWithLayout } from "pages/_app";
import React, { ReactElement } from "react";

const FeaturesPage: NextPageWithLayout = () => {
  return (
    <>
      <GetHead
        title="Features: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <FeaturesSection limit={1000} animation={false} />
    </>
  );
};

export default FeaturesPage;

FeaturesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
