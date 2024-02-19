import { Button } from "@/components/ui/button";
import Link from "next/link";

const Cta = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl my-6 gap-4">
      <p className="text-[#282828]">
        <strong>Ready to get mysterious?</strong> Click the button below to get
        started!
      </p>
      <Button className="bg-orange-500 hover:bg-[#540E38] w-fit" size="lg">
        <Link href="/sign-in">Get Started</Link>
      </Button>
    </div>
  );
};

export default Cta;
