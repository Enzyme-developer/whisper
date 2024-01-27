import axios from "axios";

export const vote = async (requestData: { answer: string; pollId: string }) => {
  const { answer, pollId } = requestData;
  const { data } = await axios.post("/api/poll/vote-poll", {
    answer,
    pollId,
  });

  console.log(data);

  if (data.error) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
