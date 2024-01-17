import { useMutation, useQuery } from "react-query";
import { getMessages } from "../helpers/getMessages";
import { createNewMessage } from "../helpers/createMessage";

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
