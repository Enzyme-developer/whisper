import Image from "next/image";
import connect from "../../assets/connect.svg";
import Vote from "@/app/components/Vote";

export default function Send({ params }: { params: { poll: string } }) {
  return (
    <main className="flex space-x-8 items-center ">
      <div className="min-h-screen w-[600px] flex items-center justify-center bg-gradientBg bg-cover bg-center">
        <Image src={connect} alt="connect" className="h-40 w-40" />
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-6 p-6">
        <span className="font-extrabold text-lg text-center">
          Cast your vote!
        </span>
        <Vote id={params?.poll} />
      </div>
    </main>
  );
}