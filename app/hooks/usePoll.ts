import { useMutation, useQuery } from "react-query";
import { getPolls } from "../helpers/getPolls";
import { createPoll } from "../helpers/createPoll";

export const usePolls = () => {
  return useQuery("polls", () => getPolls());
};

export const useCreatePoll = () => {
  return useMutation(createPoll, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
