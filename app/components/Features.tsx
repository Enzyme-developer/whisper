import React from "react";
import FadeInUp from "../animations/FadeInUp";
import FadeInView from "../animations/FadeInView";
import { featuresData } from "../utils/features";
import Feature from "./Feature";
import { featureType } from "../types/types";

const Features = () => {
  return (
    <section className="w-full my-12 flex flex-col items-center justify-center ">
      <FadeInUp className="flex flex-col gap-4 items-center text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-snug text-[#540E38]">
          Frequently asked questions
        </h1>
        <p className="text-[#282828]">
          Thoughtfully created features, just for you, sshhhh!
        </p>
      </FadeInUp>
      <FadeInView className="w-full max-w-7xl flex flex-wrap gap-6 items-center justify-center my-8">
        {featuresData?.map((featureData: any, index: number) => (
          <Feature key={index} featureData={featureData} />
        ))}
      </FadeInView>
    </section>
  );
};

export default Features;
