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

  // Tabs
  const [activeTab, setActiveTab] = useState<
    Tab | "profile" | "users" | "friendRequests" | "contacts" | "chats"
  >("contacts");

  // Selected chat
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const openChat = (chat: Chat) => {
    if (!chat?._id) return;
    setSelectedChat(chat);
    setActiveTab("chats");
  };

  // Responsive handling
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return {
    currentUser,
    activeTab,
    setActiveTab,
    selectedChat,
    setSelectedChat,
    openChat,
    isMobile,
  };
};
