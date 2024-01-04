import Link from "next/link";
import { FC } from "react";

type linkProps = {
  href: string;
  name: string;
};

const ActionLink: FC<linkProps> = ({ name, href, ...props }) => {
  return (
    <Link
      className="bg-[#540E38] px-6 py-3 w-fit rounded-full text-center font-bold text-lg transition-all hover:bg-orange-500"
      href={href}
    >
      {name}
    </Link>
  );
};

export default ActionLink;
