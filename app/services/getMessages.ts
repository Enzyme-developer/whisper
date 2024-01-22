import axios from "axios";

export const getMessages = async () => {
  const { data } = await axios.get("/api/message/get-messages");
  console.log(data);
  if (data.error || !data.messages) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
