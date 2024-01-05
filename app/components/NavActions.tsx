"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";

const NavActions = () => {
  const { signOut } = useClerk();
  const router = useRouter();
  return (
    <>
      <Button variant="ghost" onClick={() => router.push("/profile")}>
        Profile
      </Button>
      <Button variant="ghost" onClick={() => router.push("/messages")}>
        Messages
      </Button>
      <Button
        variant="destructive"
        onClick={() => signOut(() => router.push("/"))}
      >
        Sign Out
      </Button>
    </>
  );
};

export default NavActions;
