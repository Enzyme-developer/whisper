"use client";
import { useToast } from "@/components/ui/use-toast";
import { useMessages } from "../hooks/useMessages";
import { messageType } from "../types/types";
import MessageCard from "./MessageCard";
import Loading from "../loading";

const Messages = () => {
  const { toast } = useToast();
  const { data: messages, isLoading, error } = useMessages();

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong.",
      description: error?.toString(),
    });
  }

  if (isLoading) {
    return <Loading />;
  }

  if (!messages || messages.messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-500 font-medium">No messages to display...</p>
      </div>
    );
  }

  return (
    <div className="grid items-center justify-center h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 my-16">
      {messages?.messages?.map((message: messageType, index: number) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;
