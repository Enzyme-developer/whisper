import React from "react";

const Step = ({ step }: any) => {
  return (
    <div className="flex md:flex-col space-y-2">
      <div className="flex flex-col md:flex-row items-center space-x-6">
        <div className="w-8 h-8 rounded-full bg-[#540E38] flex items-center justify-center text-white font-bold">
          {step.number}
        </div>
        <div className="h-[3px] w-36 rotate-90 md:rotate-0 bg-[#540E38]"></div>
      </div>

      <div className="flex flex-col space-y-1.5">
        <span className="font-bold">{step.title}</span>
      </div>
    </div>
  );
};

export default Step;
