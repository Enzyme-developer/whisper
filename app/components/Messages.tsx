"use client";
import { useToast } from "@/components/ui/use-toast";
import { useMessages } from "../hooks/useMessages";
import { messageType } from "../types/types";
import MessageCard from "./MessageCard";
import Filter from "./Filter";
import { filterMessages } from "../helpers/filterMessages";
import { useEffect, useState } from "react";

const Messages = () => {
  const { toast } = useToast();
  const [category, setCategory] = useState("all");
  const { data: messages, isLoading, error } = useMessages();
  const [filteredMessages, setFilteredMessages] = useState(messages?.messages);

  if (error) {
    toast({
      variant: "destructive",
      title: "Something went wrong.",
      description: error?.toString(),
    });
  }


  useEffect(() => {
    setFilteredMessages(filterMessages(category, messages?.messages));
      console.log(category);
  
  }, [category]);

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 my-16">
      <Filter
        setCategory={setCategory}
        messages={messages?.messages}
      />
      {filteredMessages?.map((message: messageType, index: number) => (
        <MessageCard key={index} message={message} />
      ))}
    </div>
  );
};

export default Messages;
