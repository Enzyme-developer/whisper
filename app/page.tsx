import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-12 bg-[#7209b7]">
      <Navbar />
      <Hero />
    </main>
  );
}
