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
import { Download } from "lucide-react";
import { exportAsImage } from "../helpers/downloadImage";
import { RefObject, useRef } from "react";

const calligraphy = Calligraffitti({
  weight: "400",
  subsets: ["latin"],
});

const votes = [{ value: 10 }, { value: 20 }, { value: 30 }, { value: 5 }];
const sum = votes.reduce(
  (accumulator: number, currentValue: { value: number }) =>
    accumulator + currentValue.value,
  0
);

const Poll = ({ }) => {
  const exportRef: RefObject<HTMLDivElement> = useRef(null);
  const { user } = useUser();

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
          <p className="font-medium text-sm">17 hours ago</p>
        </CardTitle>

        <CardDescription className="pt-4 font-bold text-xl text-white">
          What is the hardest thing you have ever done?
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid w-full items-center gap-4">
          {votes?.map((vote, index: number) => (
            <div key={index} className="flex flex-col space-y-1.5">
              <p className="text-md font-medium">Getting the B.sc</p>
              <div className="flex gap-2 items-center">
                <Progress className="flex-1" value={(vote.value / sum) * 100} />
                <p>{Math.round((vote.value / sum) * 100)}%</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <p className={calligraphy.className}>Whisper</p>
        <Download
          onClick={() => exportAsImage(exportRef.current, "poll")}
          className="w-5 h-5 cursor-pointer"
          color="white"
        />
      </CardFooter>
    </Card>
  );
};

export default Poll;
