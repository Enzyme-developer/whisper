"use client";
import { useToast } from "@/components/ui/use-toast";
import { useMessages } from "../hooks/useMessages";
import { messageType } from "../types/types";
import MessageCard from "./MessageCard";
import moment from "moment";

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

  const currentDate = moment();

  const filterMessages = (category: string) => {
    const filteredMessages = messages?.messages?.filter((message: messageType) => {
      const messageDate = moment(message.createdAt);

      if (category === "today") {
        return currentDate.isSame(messageDate, "day");
      } else if (category === "yesterday") {
        return currentDate.subtract(1, "day").isSame(messageDate, "day");
      } else if (category === "older") {
        return messageDate.isBefore(currentDate.subtract(2, "day"), "day");
      }
      return true;
    });

    return filteredMessages;
  };


  console.log(filterMessages('today'))

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 my-16">
      {messages?.messages?.map((message: messageType, index: number) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;
