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
      <div className="bg-[#f0f8ff]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default RootLayout;
