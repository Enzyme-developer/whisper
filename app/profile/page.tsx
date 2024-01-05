import { currentUser } from "@clerk/nextjs";
import Navbar from "../components/Navbar";
import SocialShare from "../components/SocialShare";
import UserProfile from "../components/UserProfile";

export default async function Profile() {
  const user = await currentUser();

  return (
    <main className="h-[100vh] flex flex-col p-6">
      <Navbar />
      <div className="flex flex-col justify-center items-center space-y-6">
        <UserProfile username={user?.username as string} />
        <SocialShare username={user?.username as string} />
      </div>
    </main>
  );
}
