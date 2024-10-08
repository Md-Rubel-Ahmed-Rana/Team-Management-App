import React, { useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import testimonialData from "@/constants/testimonialData";
import Link from "next/link";
import useCardAnimation from "@/hooks/useCardAnimation";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  // const handleAnimation = useCardAnimation();

  // useEffect(() => {
  //   handleAnimation(sectionRef, "testimonial-card", "left-to-right");
  // }, []);

  return (
    <section ref={sectionRef} className="lg:p-16 p-2 text-center">
      <h2 className="lg:text-3xl text-xl font-bold mb-8">
        See What Our Users Have to Say
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonialData.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            name={testimonial.name}
            position={testimonial.position}
            userImage={testimonial.userImage}
          />
        ))}
      </div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-8 hover:bg-blue-700">
        <Link href={"/signup"}>Start Your Free Trial</Link>
      </button>
    </section>
  );
};

export default TestimonialsSection;
