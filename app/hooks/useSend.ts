import { useMutation } from "react-query";
import { createNewMessage } from "../helpers/createMessage";

export const useSendMessage = () => {
  return useMutation(createNewMessage, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
