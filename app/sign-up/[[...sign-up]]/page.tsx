import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-[100vh] flex items-center justify-center p-12">
      <SignUp afterSignInUrl="/profile" />
    </div>
  );
}
