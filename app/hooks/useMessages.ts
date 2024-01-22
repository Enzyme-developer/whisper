import { useMutation, useQuery } from "react-query";
import { getMessages } from "../services/getMessages";
import { createNewMessage } from "../services/createMessage";

export const useMessages = () => {
  return useQuery("messages", () => getMessages());
};

export const useSendMessage = () => {
  return useMutation(createNewMessage, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
