"use client";
import { useState } from "react";
import { Tab, Chat } from "../types";

export const useChatLayout = () => {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  const openChat = (chat: Chat) => setSelectedChat(chat);

  return { activeTab, setActiveTab, selectedChat, openChat };
};
