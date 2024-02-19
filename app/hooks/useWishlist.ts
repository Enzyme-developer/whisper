import { useQuery } from "react-query";
import { getWishlists } from "../services/getWishlists";
import { getWishlist } from "../services/getWishlist";

export const useWishlists = () => {
  return useQuery("wishlists", () => getWishlists());
};

export const useWishlist = (id: string) => {
  return useQuery("wishlists", () => getWishlist(id));
};
