import Image from "next/image";
import gradient from "../assets/gradient.jpg";
import connect from "../assets/connect.svg";
import SendMessage from "../components/SendMessage";

export default function Send({ params }: { params: { send: string } }) {
  return (
    <main className="min-h-screen flex md:space-x-8 items-center justify-center ">
      <div className="min-h-screen w-[600px] hidden md:flex items-center justify-center bg-gradientBg bg-cover bg-center">
        <Image src={connect} alt="connect" className="h-40 w-40" />
      </div>
      <div className="flex flex-col flex-grow items-center justify-center w-full space-y-6 p-6">
        <Image src={connect} alt="connect" className="md:hidden h-40 w-40" />
        <span className=" text-center">
          <strong>{`@${params?.send}`}</strong> <br /> send me an anonymous
          message
        </span>
        <SendMessage recipient={params.send} />
      </div>
    </main>
  );
}
