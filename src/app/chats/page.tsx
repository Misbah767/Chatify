"use client";

import React from "react";
import LeftSidebarIcons from "@/Components/chats/LeftSidebarIcons/LeftSidebarIcons";
import LeftSidebarContent from "@/Components/chats/LeftSidebarContent/LeftSidebarContent";
import ChatWindow from "@/Components/chats/ChatWindow/ChatWindow";
import { useChatPage } from "@/features/chats/hooks/useChatPage";

const ChatPage: React.FC = () => {
  const { activeTab, setActiveTab, selectedChat, openChat, isMobile } =
    useChatPage();

  return (
    <div className="flex h-screen bg-blue-400 text-white overflow-hidden">
      {/* Sidebar Icons - always visible */}
      <LeftSidebarIcons activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Sidebar Content */}
      <div
        className={`flex flex-col w-full md:w-78 border-r border-gray-700 transition-transform duration-300
          ${
            isMobile && selectedChat
              ? "-translate-x-full absolute z-30"
              : "translate-x-0 relative md:relative"
          }`}
      >
        <LeftSidebarContent
          activeTab={activeTab}
          onSelectChat={openChat}
          selectedChat={selectedChat}
        />
      </div>

      {/* Chat Window */}
      {selectedChat && (
        <div
          className={`flex-1 flex flex-col transition-all duration-300
            ${isMobile ? "w-full absolute top-0 left-0 z-20" : ""}`}
          style={{ height: "100%", maxHeight: "100%" }} // fixed height to prevent scroll
        >
          <ChatWindow
            receiverId={selectedChat._id}
            chatName={selectedChat.name}
          />
        </div>
      )}

      {/* Placeholder for desktop if no chat is selected */}
      {!isMobile && !selectedChat && (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a contact to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatPage;
