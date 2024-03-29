import axios from "axios";

export const createNewMessage = async (requestData: {
  content: string;
  recipient: string;
}) => {
  const { content, recipient } = requestData;
  const formattedRecipient = recipient.toLowerCase()
  const { data } = await axios.post("/api/message/create-message", {
    content,
    recipient: formattedRecipient,
  });

  if (data.error || !data.createdMessage) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
