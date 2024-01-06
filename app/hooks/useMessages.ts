import { useQuery } from "react-query";
import { getMessages } from "../helpers/getMessages";

export const useMessages = () => {
  return useQuery("messgaes", () => getMessages());
};
