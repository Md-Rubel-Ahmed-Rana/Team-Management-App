import DashboardSidebar from "@/components/pages/dashboard/DashboardSidebar";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen  place-items-center">
          <img src={"../assets/loadingAnimation.svg"} alt="loader" />
        </div>
      }
    >
      <div className="flex h-screen gap-2">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col overflow-hidden px-2">
          {children}
        </main>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
