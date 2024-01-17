import CreatePoll from "../components/CreatePoll";
import Polls from "../components/Polls";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-white">
      <Polls />
      <CreatePoll />
    </main>
  );
}
