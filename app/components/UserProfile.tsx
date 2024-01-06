"use client";
import { CopyIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";

const UserProfile = ({ username }: { username: string }) => {
  const { toast } = useToast();
  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      variant: "success",
      title: "Personal link copied",
      description: "You can now share with your friends!",
    });
  };

  return (
    <div className="flex flex-col space-y-4 mt-16">
      <Avatar className="w-20 h-20 mx-auto">
        <AvatarImage
          src="https://storage.prompt-hunt.workers.dev/clh371gz6002dm8081ja28ryu_1"
          alt="avatar"
        />
        <AvatarFallback>{username?.slice(0, 1)}</AvatarFallback>
      </Avatar>
      <p className="font-bold text-center text-[#540E38]">{username}</p>
      <div className="flex space-x-2 items-center justify-center">
        <span className="text-sm text-muted-foreground text-center">{`whisper.vercel.com/${username}`}</span>
        <CopyIcon
          className="w-5 h-5 font-bold cursor-pointer hover:text-orange-500"
          onClick={() => handleCopy(`whisper.vercel.com/${username}`)}
        />
      </div>
    </div>
  );
};

export default UserProfile;
