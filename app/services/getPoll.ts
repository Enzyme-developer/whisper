import axios from "axios";

export const getPoll = async (id: string) => {
  const { data } = await axios.get(`/api/poll/${id}`);
  console.log(data)
  if (data.error || !data.poll) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
