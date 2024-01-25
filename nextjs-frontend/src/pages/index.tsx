import HomePage from "@/components/pages/LandingPage";
import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

export default function Home() {
  return (
    <main>
      <HomePage />
    </main>
  );
}

Home.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>
}
