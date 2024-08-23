import React from "react";
import AccordionItem from "./AccordionItem";
import faqData from "@/constants/faqData";

const FAQSection = () => {
  return (
    <section className="lg:py-16 p-0 text-center rounded-md">
      <h2 className="lg:text-3xl text-xl font-bold mb-4">
        Frequently Asked Questions
      </h2>
      <div className="max-w-lg mx-auto text-left">
        {faqData?.map((item, index) => (
          <AccordionItem key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
