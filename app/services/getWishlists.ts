import axios from "axios";

export const getWishlists = async () => {
  const { data } = await axios.get("/api/poll/get-wishlists");
  if (data.error || !data.wishlists) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
