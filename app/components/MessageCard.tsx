"use client";
import { RefObject, useRef } from "react";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { messageType } from "../types/types";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

type DateType = string | number | Date;
declare module "dayjs" {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string;
    from(compared: DateType, withoutSuffix?: boolean): string;
    toNow(withoutSuffix?: boolean): string;
    to(compared: DateType, withoutSuffix?: boolean): string;
  }
}

const MessageCard = ({ message }: { message: messageType }) => {
  const exportRef: RefObject<HTMLDivElement> = useRef(null);

  const downloadImage = (blob: string, fileName: string) => {
    const link = window.document.createElement("a");
    link.style.display = "none";
    link.download = fileName;

    link.href = blob;
    console.log(link);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    link.remove();
  };

  const exportAsImage = async (element: any, imageFileName: string) => {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL("image/png", 1.0);
    downloadImage(image, imageFileName);
  };

  const formattedDate = dayjs(message?.createdAt).format("YYYY-MM-DD");
  dayjs.extend(relativeTime);
  const timeFromNow = dayjs(formattedDate).fromNow();

  return (
    <div
      ref={exportRef}
      className="bg-white w-[280px] min-h-32 max-h-52 shadow-xl rounded-xl"
    >
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
            onClick={() => exportAsImage(exportRef.current, "test")}
            className="w-5 h-5 cursor-pointer"
            color="purple"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
