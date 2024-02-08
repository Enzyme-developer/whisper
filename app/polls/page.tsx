import Polls from "../components/Polls";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col p-6 min-h-screen">
      <Navbar />
      <Polls />
    </main>
  );
}
