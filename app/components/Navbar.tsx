import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full">
      <span className="font-bold text-lg leading-4 text-[#171717]">
        Whisper
      </span>
      <div className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
        <Button className="bg-[#540E38] hover:bg-orange-500">
          <Link href="messages">Get Started</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
