import { useMutation } from 'react-query';
import { createNewMessage } from '../helpers/createMessage';

type Book = {
  title: string;
  author: string;
}

export const useSendMessage = () => {
  return useMutation(createNewMessage, {
    onSuccess: () => {
     console.log("success")
    },
    onError: (error) => {
     console.log(error)
    },
  });
};