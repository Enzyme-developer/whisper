import React from "react";

const Step = ({ step }: any) => {
  return (
    <div className="flex flex-col items-center justify-center space-1.5">
      <div className="w-8 h-8 rounded-full bg-[#540E38] flex items-center justify-center text-white font-bold">
        {step.number}
      </div>
      <span className="font-bold text-center">{step.title}</span>
    </div>
  );
};

export default Step;
