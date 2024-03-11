"use client"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon } from "lucide-react";
import React, { useRef } from "react";

const Wishlists = () => {
  const targetButtonRef = useRef(null);

  const handleButtonClick = () => {
    if (targetButtonRef.current) {
      (targetButtonRef.current as HTMLButtonElement).click();
    }
  };

  return (
    <div>
      <div
        className="w-48 h-full p-3 rounded-lg bg-[#540E38] cursor-pointer"
        onClick={handleButtonClick}
      >
        <div className="flex items-center justify-center rounded-md bg-white h-40">
          <CameraIcon color="purple" />
        </div>
        <p className="text-sm font-medium text-white my-3 text-center">
          Add Photo
        </p>
      </div>

      <Input
        id="picture"
        type="file"
        className="hidden"
        ref={targetButtonRef}
      />
    </div>
  );
};

export default Wishlists;
