import { useMutation, useQuery, useQueryClient } from "react-query";
import { getPolls } from "../services/getPolls";
import { createPoll } from "../services/createPoll";
import { vote } from "../services/vote";
import { getPoll } from "../services/getPoll";

export const usePolls = () => {
  return useQuery("polls", () => getPolls());
};

export const usePoll = (id: string) => {
  return useQuery("polls", () => getPoll(id));
};

export const useCreatePoll = () => {
  const queryClient = useQueryClient();
  return useMutation(createPoll, {
    onSuccess: () => {
      queryClient.invalidateQueries("polls")
    },
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
