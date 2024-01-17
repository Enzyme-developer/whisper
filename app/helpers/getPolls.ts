import axios from "axios";

export const getPolls = async () => {
  const { data } = await axios.get("/api/poll/get-polls");
  console.log(data);
  if (data.error || !data.polls) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
