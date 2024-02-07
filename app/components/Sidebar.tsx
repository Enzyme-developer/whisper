"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import NavActions from "./NavActions";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Sidebar() {
  const { isSignedIn } = useUser();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen} >
      <SheetTrigger asChild>
        <Button variant="ghost" className="flex md:hidden">
          <MenuIcon className="w-5 h-5" color="purple" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>
            <Link href="/">
              <Image alt="whisper logo" src={logo} width={60} height={60} />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {isSignedIn ? (
            <NavActions setOpen={setSheetOpen} />
          ) : (
            <Button className="bg-[#540E38] hover:bg-orange-500">
              <Link href="/messages">Get Started</Link>
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
