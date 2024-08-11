import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <section className="shadow-md  lg:py-36 py-10 px-2 text-center">
      <h1 data-aos="fade-up" className="lg:text-4xl text-2xl font-bold mb-4">
        Welcome to Team Manager
      </h1>
      <p data-aos="fade-up" className="text-lg mb-8">
        Effortlessly manage tasks, projects, and collaboration with Team
        Manager.
      </p>
      <button
        data-aos="fade-up"
        className="bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-900 hover:text-white"
      >
        <Link href={"/signup"}>Get Started</Link>
      </button>
    </section>
  );
};

export default WelcomePage;
