import { useMutation, useQuery } from "react-query";
import { getPolls } from "../services/getPolls";
import { createPoll } from "../services/createPoll";
import { vote } from "../services/vote";

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

export const useVote = () => {
  return useMutation(vote, {
    onSuccess: () => {},
    onError: (error) => {
      console.log(error);
    },
  });
};
