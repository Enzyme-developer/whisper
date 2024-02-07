import Navbar from "../components/Navbar";
import Messages from "../components/Messages";
import { Suspense } from "react";

export default async function messages() {
  return (
    <div className="flex flex-col p-6 min-h-[100vh]">
      <Navbar />
      <div className="flex flex-grow items-center justify-center ">
        <Messages />
      </div>
    </div>
  );
}
