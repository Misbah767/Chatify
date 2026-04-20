"use client";

import React from "react";
import LeftSidebarIcons from "@/Components/chats/LeftSidebarIcons/LeftSidebarIcons";
import LeftSidebarContent from "@/Components/chats/LeftSidebarContent/LeftSidebarContent";
import ChatWindow from "@/Components/chats/ChatWindow/ChatWindow";
import { useChatPage } from "@/features/chats/hooks/useChatPage";

const ChatPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    selectedChat,
    openChat,
    isMobile,
    closeChat,
  } = useChatPage();

  // ✅IMPORTANT: wrap openChat to also lock tab to "contacts"
  const handleSelectChat = (chat: any) => {
    setActiveTab("contacts"); // 👈 keeps sidebar active state correct
    openChat(chat);
  };

  return (
    <div className="flex h-screen bg-[#141414] text-white overflow-hidden">
      {/* ICONS */}
      <LeftSidebarIcons
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        closeChat={closeChat}
      />

      {/* LEFT PANEL */}
      <div
        className={`flex flex-col w-full md:w-78 border-r border-[#262626] transition-transform duration-300
        ${
          isMobile && selectedChat
            ? "-translate-x-full absolute z-30"
            : "translate-x-0 relative"
        }`}
      >
        <LeftSidebarContent
          activeTab={activeTab}
          onSelectChat={handleSelectChat} // use wrapped function
          selectedChat={selectedChat}
        />
      </div>

      {/* CHAT WINDOW */}
      {selectedChat && (
        <div
          className={`
            flex-1 flex flex-col
            transition-all duration-300
            ${isMobile ? "fixed inset-0 z-40 pb-16" : ""}
          `}
        >
          <ChatWindow
            receiverId={selectedChat._id}
            chatName={selectedChat.name}
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {!isMobile && !selectedChat && (
        <div className="flex-1 flex items-center justify-center text-gray-500 bg-[#141414]"></div>
      )}
    </div>
  );
};

export default ChatPage;
