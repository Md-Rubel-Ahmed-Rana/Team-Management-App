import Link from "next/link";
import React from "react";

const WelcomePage = () => {
  return (
    <div className="text-center bg-black bg-opacity-50 absolute top-0 w-full h-full flex justify-center items-center">
      <div className="px-4 py-6 rounded-lg">
        <h1
          data-aos="fade-left"
          className="lg:text-4xl text-xl font-bold mb-4 text-white"
        >
          Welcome to Team Manager
        </h1>
        <p data-aos="fade-right" className="text-lg mb-8 text-white">
          Effortlessly manage tasks, projects, and collaboration with Team
          Manager.
        </p>
        <button
          data-aos="fade-up"
          className="bg-purple-700 text-white py-2 px-4 rounded-full hover:bg-purple-900 hover:text-white"
        >
          <Link href={"/signup"}>Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
