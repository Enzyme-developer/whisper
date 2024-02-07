"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/clerk-react";
import { Dispatch, SetStateAction } from "react";

type NavActionProps = {
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

const NavActions = ({ setOpen }: NavActionProps) => {
  const { signOut } = useClerk();
  const router = useRouter();

  const links = [
    {
      route: "Profile",
      href: "/profile",
    },
    {
      route: "Messages",
      href: "/messages",
    },
    {
      route: "Polls",
      href: "/polls",
    },
  ];

  return (
    <>
      {links.map((link, index: number) => (
        <Button
          key={index}
          variant="ghost"
          onClick={() => {
            router.push(link.href as string);
            if (setOpen !== undefined) {
              setOpen(false);
            }
          }}
        >
          {link.route}
        </Button>
      ))}

      <Button
        variant="destructive"
        onClick={() => {
          signOut(() => router.push("/"));
          if (setOpen !== undefined) {
            setOpen(false);
          }
        }}
      >
        Sign Out
      </Button>
    </>
  );
};

export default NavActions;
