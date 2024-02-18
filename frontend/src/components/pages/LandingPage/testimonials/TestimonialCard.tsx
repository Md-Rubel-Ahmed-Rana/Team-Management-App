/* eslint-disable @next/next/no-img-element */
import React from "react";

type Props = {
  quote: string;
  name: string;
  position: string;
  userImage: string;
};

const TestimonialCard = ({ quote, name, position, userImage }: Props) => {
  return (
    <div className="testimonial-card p-6 rounded-lg shadow-md">
      <p className="text-lg mb-4">{quote}</p>
      <div className="flex items-center justify-center space-x-4">
        <img src={userImage} alt={name} className="w-12 h-12 rounded-full" />
        <div className="text-left">
          <p className="font-bold">{name}</p>
          <p>{position}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
