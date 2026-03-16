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
  const { chatId, mobileHeightStyle } = useChatWindow(receiverId);

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Loading chat...
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full border border-gray-700 rounded-md overflow-hidden"
      style={mobileHeightStyle}
    >
      {/* Chat Header */}
      <div className="shrink-0">
        <ChatHeader targetId={receiverId} />
      </div>

      {/* Chat Body */}
      <div className="flex-1 px-2 md:px-4" style={{ overflow: "hidden" }}>
        <ChatBody chatId={chatId} />
      </div>

      {/* Chat Footer */}
      <div className="shrink-0">
        <ChatFooter chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatWindow;
