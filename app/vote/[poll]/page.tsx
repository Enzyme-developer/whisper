import Image from "next/image";
import gradient from "../../assets/gradient.jpg";
import Vote from "@/app/components/Vote";

export default function Send({ params }: { params: { poll: string } }) {
  return (
    <main className="flex space-x-8 items-center ">
      <div className="h-[100vh] w-[600px] bg-gradient bg-cover bg-center">
        <Image
          src={gradient}
          alt="background"
          className="h-full w-full size-full"
        />
      </div>
      <div className="flex flex-col items-center justify-center w-full space-y-6 p-6">
        <span className="font-extrabold text-lg text-center">Cast your vote!</span>
        <Vote id={params?.poll} />
      </div>
    </main>
  );
}
