import React from "react";
import MessageCard from "./MessageCard";

const Messages = () => {
  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-10 my-16">
      <MessageCard />
    </div>
  );
};

export default Messages;
