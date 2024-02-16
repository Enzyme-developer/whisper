import React from "react";

const Footer = () => {
  return (
    <footer className="shadow-lg p-3 border-t-[1px] border-gray-200">
      <p className="text-sm text-center text-[#282828] font-bold">
        &copy; Whisper - Connect, Vote, and Express Anonymously | All Rights
        Reserved | {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
