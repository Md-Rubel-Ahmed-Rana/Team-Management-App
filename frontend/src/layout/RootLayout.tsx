import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen  place-items-center">
          <img src={"../assets/loadingAnimation.svg"} alt="loader" />
        </div>
      }
    >
      <div>
        <Navbar />
        <main className="max-w-[1280px] w-full mx-auto">{children}</main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default RootLayout;
