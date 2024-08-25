import HomePage from "@/components/pages/LandingPage";
import BackgroundCarousel from "@/components/pages/LandingPage/backgroundCarousel";
import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { ReactElement } from "react";

export default function Home() {
  return (
    <>
      <GetHead
        title="Home: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <BackgroundCarousel />
      <div className="max-w-[1280px] w-full mx-auto">
        <HomePage />
      </div>
    </>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
