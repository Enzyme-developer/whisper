"use client"
import { FormEvent } from "react";
import { createNewMessage } from "../helpers/createMessage";

const SendMessage = () => {
  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const message = await createNewMessage();
      console.log(message);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
      }
    } finally {
    }
  };
  return (
    <div>
      <form onSubmit={sendMessage}>
        <input type="text" />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default SendMessage;
