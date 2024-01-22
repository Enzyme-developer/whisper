import axios from "axios";

export const vote = async (requestData: {
  optionIndex: string;
  pollId: string;
}) => {
  const { optionIndex, pollId } = requestData;
  const { data } = await axios.post("/api/poll/vote-poll", {
    optionIndex,
    pollId,
  });
    
  console.log(data);

  if (data.error || !data.createdMessage) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
