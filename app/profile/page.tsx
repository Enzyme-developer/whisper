import { currentUser } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import SocialShare from "../components/SocialShare";
import UserProfile from "../components/UserProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Whisper",
  description: "Connect, Vote, and Express Anonymously",
  metadataBase: new URL("https://whisper-me.vercel.app/"),
};

export default async function Profile() {
  const user = await currentUser();

  return (
    <main className="min-h-[100vh] flex flex-col p-6">
      <Navbar />
      <div className="flex flex-col flex-grow justify-center items-center mt-6 space-y-6">
        <UserProfile username={user?.username as string} />
        <SocialShare username={user?.username as string} />
      </div>
    </main>
  );
}
