import RootLayout from "@/layout/RootLayout";
import GetHead from "@/utils/Head";
import { ReactElement } from "react";

const GuidePage = () => {
  return (
    <>
      <GetHead
        title="Guides: Team Manager"
        description="team management, project collaboration, task tracking, project details"
        keywords="team management, project collaboration, task tracking, project details"
      />
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-2xl font-semibold text-center">
          Content unavailable
        </h1>
      </div>
    </>
  );
};

export default GuidePage;

GuidePage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
