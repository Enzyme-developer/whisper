import Polls from "../components/Polls";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col p-6 min-h-[100vh]">
      <Navbar />
      <div className="flex flex-grow items-center justify-center ">
        <Polls />
      </div>
    </main>
  );
}
