import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <main className="flex justify-center items-center mt-20">
      <div className="max-w-4xl flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="text-6xl font-bold leading-snug text-[#540E38]">
          Discover the Power of <br /> Anonymity.
        </h1>
        <p className="text-[#282828]">
          Whisper, where your voice can be heard without boundaries. Connect
          with others through anonymous messages or spark conversations with
          stealthy polls.
        </p>
        <Button className="bg-orange-500 hover:bg-[#540E38]" size="lg">
          <Link href="messages">Get Started</Link>
        </Button>
      </div>
    </main>
  );
};

export default Hero;
