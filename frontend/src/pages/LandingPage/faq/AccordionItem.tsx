import React from "react";

type Props = {
  data: { question: string; answer: string };
};

const AccordionItem = ({ data }: Props) => {
  const { question, answer } = data;
  return (
    <div>
      <div className="mb-4 collapse collapse-arrow bg-white">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium">{question}</div>
        <div className="collapse-content">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
