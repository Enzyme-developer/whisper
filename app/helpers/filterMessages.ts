import moment from "moment";
import { messageType } from "../types/types";

const currentDate = moment();

export const filterMessages = (
  category: string,
  messages: messageType[] | undefined
) => {
  if (!messages) {
    return [];
  }

  const isSameDay = (a: moment.Moment, b: moment.Moment) => a.isSame(b, "day");

  const filteredMessages = messages.filter((message) => {
    const messageDate = moment(message.createdAt);

    switch (category) {
      case "today":
        return isSameDay(currentDate, messageDate);
      case "yesterday":
        return isSameDay(currentDate.subtract(1, "day"), messageDate);
      case "older":
        return messageDate.isBefore(currentDate.subtract(2, "day"), "day");
      default:
        return true;
    }
  });

  return filteredMessages;
};
