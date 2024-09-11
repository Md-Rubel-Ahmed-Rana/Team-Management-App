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
      <main className="flex gap-2 max-w-[1280px] w-full mx-auto mt-5">
        <section className="w-full flex-1 flex flex-col overflow-hidden px-2">
          {children}
        </section>
      </main>
    </Suspense>
  );
};

export default DashboardLayout;
