"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/auth.slice";
import { Tab } from "@/features/chats/types";

export interface Chat {
  _id: string;
  name: string;
  status?: "active" | "blocked" | "offline";
}

export const useChatPage = () => {
  const currentUser = useSelector(selectUser);

  //  ONLY REAL NAV TABS (NO "chats" HERE)
  const [activeTab, setActiveTab] = useState<
    "profile" | "users" | "friendRequests" | "contacts"
  >("contacts");

  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // OPEN CHAT (DO NOT CHANGE TAB)
  const openChat = (chat: Chat) => {
    if (!chat?._id) return;
    setSelectedChat(chat);

    //  REMOVED: setActiveTab("chats");
    // Reason: chat is NOT a tab, it's UI state
  };

  // CLOSE CHAT
  const closeChat = () => {
    setSelectedChat(null);
  };

  // TAB SWITCH HANDLER
  const handleSetActiveTab = (
    tab: "profile" | "users" | "friendRequests" | "contacts"
  ) => {
    setActiveTab(tab);

    // mobile behavior: close chat when switching sections
    if (isMobile) {
      setSelectedChat(null);
    }
  };

  return {
    currentUser,

    activeTab,
    setActiveTab: handleSetActiveTab,

    selectedChat,
    setSelectedChat,

    openChat,
    closeChat,

    isMobile,
  };
};
