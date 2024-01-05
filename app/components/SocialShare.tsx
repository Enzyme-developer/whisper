"use client";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const SocialShare = ({ username }: { username: string }) => {
  const url = `whisper.vercel.com/${username}`;
  const body =
    "Got secrets? Leave me an anonymous message and keep the mystery alive! Shhh... 💌";
  return (
    <div className="text-center">
      <span className="text-base text-[#540E38] font-black">Share on social media</span>
      <div className="flex space-x-4 items-center my-4">
        <FacebookShareButton
          resetButtonStyle={false}
          className="border-2 rounded-full border-blue-500 p-1"
          url={url}
          hashtag="whisper"
        >
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          resetButtonStyle={false}
          className="border-2 rounded-full border-black p-1"
          url={url}
          title={body}
        >
          <XIcon size={32} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton
          resetButtonStyle={false}
          className="border-2 rounded-full border-green-500 p-1"
          url={url}
          title={body}
        >
          <WhatsappIcon size={32} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          resetButtonStyle={false}
          className="border-2 rounded-full border-gray-600 p-1"
          url={url}
          subject="Ready for the Whispers?"
          body={body}
        >
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default SocialShare;
