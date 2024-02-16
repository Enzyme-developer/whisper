import React from "react";
import { Faq } from "./Faq";
import FadeInUp from "../animations/FadeInUp";
import FadeInView from "../animations/FadeInView";

const FaqSection = () => {
  return (
    <section className="w-full my-4 flex flex-col items-center justify-center ">
      <FadeInUp className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-snug text-[#540E38]">
          Frequently asked questions
        </h1>
        <p className="text-[#282828]">
          Get answers to the questions leaving you in the dark.
        </p>
      </FadeInUp>
      <FadeInView className="w-full md:w-[80%] my-4">
        <Faq />
      </FadeInView>
    </section>
  );
};

export default FaqSection;
