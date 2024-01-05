import { currentUser } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import Messages from "../components/Messages";

export default async function messages() {
  const user = await currentUser();
  return (
    <div className="flex flex-col p-6 min-h-[100vh]">
      <Navbar />
      <div className="flex flex-grow items-center justify-center ">
        <Messages />
      </div>
    </div>
  );
}
