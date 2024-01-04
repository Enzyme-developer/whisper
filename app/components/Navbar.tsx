import { UserButton } from "@clerk/nextjs";
import ActionLink from "./base/ActionLink";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full">
      <span className="font-bold text-lg leading-4 text-[#171717]">
        Whisper
      </span>
      <div className="flex items-center space-x-4">
        <UserButton afterSignOutUrl="/" />
        <ActionLink href="/login" name="Get Started" />
      </div>
    </nav>
  );
};

export default Navbar;
