import Image from "next/image";
import gradient from "../assets/gradient.jpg";
import connect from "../assets/connect.svg";
import SendMessage from "../components/SendMessage";

export default function Send({ params }: { params: { send: string } }) {
  return (
    <main className="flex space-x-8 items-center ">
      <div className="min-h-screen w-[600px] flex items-center justify-center bg-gradientBg bg-cover bg-center">
        <Image src={connect} alt="connect" className="h-40 w-40" />
      </div>
      <div className="flex flex-col flex-grow-1 items-center justify-center w-full space-y-6 p-6">
        <span className=" text-center">
          <strong>{`@${params?.send}`}</strong> <br /> send me an anonymous
          message
        </span>
        <SendMessage recipient={params.send} />
      </div>
    </main>
  );
}
