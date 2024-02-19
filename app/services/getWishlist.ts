import axios from "axios";

export const getWishlist = async (id: string) => {
  const { data } = await axios.get(`/api/wishlist/${id}`);
  console.log(data);
  if (data.error || !data.wishlist) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
