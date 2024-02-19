import Cta from "./components/Cta";
import FaqSection from "./components/FaqSection";
import Features from "./components/Features";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="overflow-hidden flex min-h-screen flex-col p-6 bg-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FaqSection />
      <Cta />
    </main>
  );
}
