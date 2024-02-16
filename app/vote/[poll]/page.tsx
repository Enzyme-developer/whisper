import Image from "next/image";
import connect from "../../assets/connect.svg";
import Vote from "@/app/components/Vote";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whisper",
  description: "Connect, Vote, and Express Anonymously",
};

export default function Send({ params }: { params: { poll: string } }) {
  return (
    <main className="min-h-screen flex md:space-x-8 items-center justify-center ">
      <div className="min-h-screen w-[600px] hidden md:flex items-center justify-center bg-gradientBg bg-cover bg-center">
        <Image src={connect} alt="connect" className="h-60 w-60" />
      </div>
      <div className="flex flex-col flex-grow items-center justify-center w-full space-y-6 p-6">
        <Image src={connect} alt="connect" className="md:hidden h-40 w-40" />
        <span className="font-extrabold text-lg text-center">
          Cast your vote!
        </span>
        <Vote id={params?.poll} />
      </div>
    </main>
  );
}
