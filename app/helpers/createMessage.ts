import axios from "axios";

// export const createNewMessage = async () => {
//   const { data } = await axios.post("/api/message/create-message", {
//     content: "Hello",
//     recipient: "Enzyme",
//   });
//   console.log(data);
//   if (data.error || !data.createdApiKey) {
//     if (data.error instanceof Array) {
//       throw new Error(data.error.join(""));
//     }
//     throw new Error(data.error);
//   }

//   return data;
// };

export const createNewMessage = async () => {
  const { data } = await axios.get("/api/message/get-messages");
  console.log(data);
  if (data.error || !data.createdApiKey) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(""));
    }
    throw new Error(data.error);
  }

  return data;
};
