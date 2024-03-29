import { Button } from "@/components/ui/button";
import Link from "next/link";
import FadeInView from "../animations/FadeInView";

const Cta = () => {
  return (
    <FadeInView className="flex flex-col items-center justify-center max-w-5xl my-6 gap-4">
      <p className="text-[#282828] text-center">
        <strong>Ready to get mysterious?</strong> Click the button below to get
        started!
      </p>
      <Button className="bg-orange-500 hover:bg-[#540E38] w-fit" size="lg">
        <Link href="/sign-in">Get Started</Link>
      </Button>
    </FadeInView>
  );
};

export default Cta;
