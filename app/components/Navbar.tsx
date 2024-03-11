"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import NavActions from "./NavActions";
import logo from "../assets/logo.png";
import Image from "next/image";
import { Sidebar } from "./Sidebar";

const Navbar = () => {
  const { isSignedIn } = useUser();
  return (
    <nav className="flex justify-between items-center w-full">
      <Link href="/">
        <Image alt="whisper logo" src={logo} width={60} height={60} />
      </Link>

      <div className="hidden md:flex items-center space-x-4">
        <SignedIn>
          <NavActions />
        </SignedIn>
        <SignedOut>
          <Button className="bg-[#540E38] hover:bg-orange-500">
            <Link href="/messages">Get Started</Link>
          </Button>
        </SignedOut>
      </div>

      <Sidebar />
    </nav>
  );
};

export default Navbar;
