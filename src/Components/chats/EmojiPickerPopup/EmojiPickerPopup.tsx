"use client";

import React, { useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";

interface Props {
  onEmoji: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPickerPopup: React.FC<Props> = ({ onEmoji, onClose }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="absolute bottom-16 z-50">
      <EmojiPicker
        onEmojiClick={(e) => {
          onEmoji(e.emoji);
        }}
      />
    </div>
  );
};

export default EmojiPickerPopup;
