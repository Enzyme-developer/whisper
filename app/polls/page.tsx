import Polls from "../components/Polls";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="bg-white flex min-h-full flex-col p-6">
      <Navbar />
      <Polls />
    </main>
  );
}
