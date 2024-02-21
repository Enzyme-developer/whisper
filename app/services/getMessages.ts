import axios from "axios";

export const getMessages = async () => {
  const { data } = await axios.get("/api/message/get-messages");
  if (data.error || !data.messages) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
