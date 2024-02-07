"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calligraffitti } from "next/font/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@clerk/nextjs";
import { CopyIcon, Download } from "lucide-react";
import { exportAsImage } from "../helpers/downloadImage";
import { RefObject, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment";

const calligraphy = Calligraffitti({
  weight: "400",
  subsets: ["latin"],
});

const Poll = ({ poll }: { poll: any }) => {
  const exportRef: RefObject<HTMLDivElement> = useRef(null);
  const { user } = useUser();
  const { toast } = useToast();
  const votes = poll?.votes;

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      variant: "success",
      title: "Voting link copied",
      description: "You can now share your poll!",
    });
  };

  const sum = votes.reduce(
    (accumulator: number, currentValue: { votes: number }) =>
      accumulator + currentValue.votes,
    0
  );

  const formattedDate = moment(poll?.createdAt).toString();
  const timeFromNow = moment(formattedDate).fromNow();

  return (
    <Card
      ref={exportRef}
      className="w-[350px] bg-gradientBg bg-cover bg-center text-white"
    >
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 mx-auto">
              <AvatarImage src={user?.imageUrl} alt="avatar" />
              <AvatarFallback>{user?.username?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="font-bold text-sm">{user?.username}</p>
          </div>
          <p className="font-medium text-sm">{timeFromNow}</p>
        </CardTitle>

        <CardDescription className="pt-4 font-bold text-xl text-white">
          {poll?.question}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid w-full items-center gap-4">
          {votes && votes.length > 0 ? (
            <>
              <p className="text-md font-medium my-2">{sum} total Vote(s)</p>
              {votes.map((vote: { value: number }, index: number) => (
                <div key={index} className="flex flex-col space-y-1.5">
                  <p className="text-md font-medium">Getting the B.sc</p>
                  <div className="flex gap-2 items-center">
                    <Progress
                      className="flex-1"
                      value={(vote.value / sum) * 100}
                    />
                    <p>{Math.round((vote.value / sum) * 100)}%</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p>No votes yet</p>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <p className={calligraphy.className}>Whisper</p>
        <Download
          onClick={() => exportAsImage(exportRef.current, "poll")}
          className="w-5 h-5 cursor-pointer"
          color="white"
        />
        <CopyIcon
          className="w-5 h-5 font-bold cursor-pointer hover:text-orange-500"
          onClick={() => handleCopy(`whisper-orcin.vercel.app/${poll?.id}`)}
        />
      </CardFooter>
    </Card>
  );
};

export default Poll;
