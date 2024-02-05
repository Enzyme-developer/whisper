import axios from "axios";

export const createPoll = async (requestData: {
  question: string;
  options: string[];
}) => {
  const { question, options } = requestData;
  const { data } = await axios.post("/api/poll/create-poll", {
    question,
    options
  });
  console.log(data);
  if (data.error || !data.createdPoll) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
