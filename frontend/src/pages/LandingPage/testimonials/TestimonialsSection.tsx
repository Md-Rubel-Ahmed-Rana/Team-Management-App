import React from "react";
import TestimonialCard from "./TestimonialCard";
import testimonialData from "../../../constants/testimonialData";
import { Link } from "react-router-dom";

const TestimonialsSection = () => {
  return (
    <section className="bg-gray-100 p-16 text-center">
      <h2 className="text-3xl font-bold mb-8">
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
        <Link to={"/signup"}>Start Your Free Trial</Link>
      </button>
    </section>
  );
};

export default TestimonialsSection;
