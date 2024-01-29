import React from "react";
import AccordionItem from "./AccordionItem";
import faqData from "@/constants/faqData";

const FAQSection = () => {
  return (
    <section className="py-16 text-center rounded-md">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
      <div className="max-w-lg mx-auto text-left">
        {faqData?.map((item, index) => (
          <AccordionItem key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
