/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";

import boredIllustration from "../assets/WhisperIllustration.svg";
import { steps } from "../utils/steps";
import Step from "./Step";
import FadeInRight from "../animations/FadeInRight";

const HowItWorks = () => {
  return (
    <div className="my-12 flex flex-col items-center justify-center">
      <h1 className="text-2xl md:text-3xl font-extrabold leading-snug text-[#540E38]">
        How It Works
      </h1>
      <p className="text-[#282828] text-center">
        <strong>What's Boredom?</strong> With Whisper, get rid of boredom!
      </p>
      <FadeInRight>
        <Image
          src={boredIllustration}
          className="w-80 h-80 my-4"
          alt="bored illustration"
        />
      </FadeInRight>
      <div className="flex flex-wrap items-center justify-center gap-8 my-8 ">
        {steps.map((step, index: number) => (
          <Step key={index} step={step} />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
