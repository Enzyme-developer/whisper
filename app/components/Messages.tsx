"use client";
import { useToast } from "@/components/ui/use-toast";
import { useMessages } from "../hooks/useMessages";
import { messageType } from "../types/types";
import MessageCard from "./MessageCard";
import Loading from "../loading";
import { filterMessages } from "../helpers/filterMessages";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Messages = () => {
  const { toast } = useToast();
  const { data: messages, isLoading, error } = useMessages();
  const [category, setCategory] = useState("all");
  const [newMessages, setNewMessages] = useState<any>([]);

  console.log(category);

  useEffect(() => {
    const msg = filterMessages(category, messages?.messages);
    setNewMessages(msg);
  }, [category, messages]);

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

  if (!messages || messages?.messages?.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-500 font-medium">
          There are no messages to display...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col min-h-screen my-16 space-y-2">
      <Select
        onValueChange={(value: string) => setCategory(value)}
        defaultValue={"all"}
      >
        <SelectTrigger className="w-[180px] self-start ml-4 mt-4">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="yesterday">Yesterday</SelectItem>
          <SelectItem value="older">Older</SelectItem>
        </SelectContent>
      </Select>

      {newMessages?.length > 0 ? (
        <div className="grid items-center justify-center h-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {newMessages.map((message: messageType, index: number) => (
            <MessageCard key={index} message={message} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-sm text-gray-500 text-center font-medium">
            There are no messages to display...
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
