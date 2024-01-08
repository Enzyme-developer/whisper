"use client";
import { RefObject, useRef } from "react";
import { Download } from "lucide-react";
import { messageType } from "../types/types";
import moment from "moment";
import { exportAsImage } from "../helpers/downloadImage";

const MessageCard = ({ message }: { message: messageType }) => {
  const exportRef: RefObject<HTMLDivElement> = useRef(null);

  const formattedDate = moment(message?.createdAt).toString();
  const timeFromNow = moment(formattedDate).fromNow();

  return (
    <div className="bg-white p-6" ref={exportRef}>
      <div className="bg-white border-[1px] border-gray-400 w-[280px] min-h-36 max-h-52 shadow-xl rounded-xl">
        <div className="flex justify-center items-center rounded-t-xl h-20 p-2 w-full bg-gradient-to-r from-purple-500 to-pink-500">
          <h1 className="text-center font-bold text-white">
            Send me an anonymous message!
          </h1>
        </div>
        <div className="bg-white rounded-b-xl p-2">
          <p className=" text-base text-center font-semibold mt-2 break-all">
            {message?.content}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-medium text-sm">{timeFromNow}</span>
            <Download
              onClick={() => exportAsImage(exportRef.current, "message")}
              className="w-5 h-5 cursor-pointer"
              color="purple"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
