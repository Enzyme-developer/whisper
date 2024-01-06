"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import NavActions from "./NavActions";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="flex justify-between items-center w-full">
      <span className="font-bold text-lg leading-4 text-[#540E38]">
        <Link href="/">Whisper</Link>
      </span>
      <div className="flex items-center space-x-4">
        {isSignedIn ? (
          <NavActions />
        ) : (
          <Button className="bg-[#540E38] hover:bg-orange-500">
            <Link href="/messages">Get Started</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
