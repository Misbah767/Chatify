"use client";

import React from "react";
import ChatHeader from "../ChatHeader/ChatHeader";
import ChatBody from "../ChatBody/ChatBody";
import ChatFooter from "../ChatFooter/ChatFooter";
import { useChatWindow } from "@/features/chats/hooks/useChatWindow";

interface Props {
  receiverId: string;
  chatName: string;
  status?: "online" | "offline" | "blocked";
}

const ChatWindow: React.FC<Props> = ({ receiverId }) => {
  const { chatId } = useChatWindow(receiverId);

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 bg-[#141414]">
        Loading chat...
      </div>
    );
  }

  return (
    <div
      className="
        flex flex-col
        w-full
        h-full
        bg-[#141414]
        border border-[#262626]
        rounded-md
        overflow-hidden
        relative
      "
    >
      {/* HEADER */}
      <div className="shrink-0 z-10 bg-[#141414] border-b border-[#262626]">
        <ChatHeader targetId={receiverId} />
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-y-auto px-2 md:px-4 py-2 bg-[#141414]">
        <ChatBody chatId={chatId} />
      </div>

      {/* FOOTER */}
      <div className="shrink-0 z-10 bg-[#141414] border-t border-[#262626]">
        <ChatFooter chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatWindow;