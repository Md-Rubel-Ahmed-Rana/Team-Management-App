import DashboardSidebar from "@/components/pages/dashboard/DashboardSidebar";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen place-items-center">
          <img src={"../assets/loadingAnimation.svg"} alt="loader" />
        </div>
      }
    >
      <div className="flex gap-2">
        <div className="w-1/5">
          <DashboardSidebar />
        </div>
        <main className="w-4/5 flex-1 flex flex-col overflow-hidden px-2">
          {children}
        </main>
      </div>
    </Suspense>
  );
};

export default DashboardLayout;
