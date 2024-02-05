import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2Icon className="animate-spin w-8 h-8" color="purple" />
    </div>
  );
}
