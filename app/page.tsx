import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-white">
      <Navbar />
      <Hero />
    </main>
  );
}
