import { UserButton } from "@clerk/nextjs";
import ActionLink from "./base/ActionLink";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full">
      <span className="font-bold text-lg leading-4">Whisper</span>
      <UserButton afterSignOutUrl="/" />
      <ActionLink href="/login" name="Sign In" />
    </nav>
  );
};

export default Navbar;
