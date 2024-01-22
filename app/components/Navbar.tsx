"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import NavActions from "./NavActions";
import logo from "../assets/logo.png"
import Image from "next/image";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="flex justify-between items-center w-full">
      <span className="font-bold text-lg leading-4 text-[#540E38]">
        <Link href="/">
          <Image alt="whisper logo" src={logo} width={60} height={60} />
        </Link>
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
