import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadeInView from "../animations/FadeInView";
import Image from "next/image";
import connect from "../assets/connect.svg";
import FadeInUp from "../animations/FadeInUp";

const Hero = () => {
  return (
    <main className="flex flex-col justify-center items-center mt-20">
      <FadeInView className="max-w-4xl flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-snug text-[#540E38]">
          Discover the Power of <br /> Anonymity.
        </h1>
        <p className="text-[#282828]">
          Whisper, where your voice can be heard without boundaries. Connect
          with others through anonymous messages or spark conversations with
          stealthy polls.
        </p>
        <Button className="bg-orange-500 hover:bg-[#540E38]" size="lg">
          <Link href="/sign-in">Get Started</Link>
        </Button>
      </FadeInView>

      <FadeInUp>
        <Image alt="connect" src={connect} className="mt-12 w-72 md:w-96 h-72 md:h-96" />
      </FadeInUp>
    </main>
  );
};

export default Hero;
