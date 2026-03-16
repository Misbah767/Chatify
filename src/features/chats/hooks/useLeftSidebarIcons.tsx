"use client";

import { User, Users, Phone } from "lucide-react";
import { Tab } from "@/features/chats/types";
import { useLeftSidebarProfile } from "@/features/chats/hooks/useLeftSidebarProfile";

export const useLeftSidebarIcons = () => {
  const { avatarUrl, loading } = useLeftSidebarProfile();

  const icons: {
    tab: Tab | "users" | "friendRequests" | "contacts";
    icon: React.ReactNode;
  }[] = [
    { tab: "users", icon: <User size={24} /> },
    { tab: "friendRequests", icon: <Users size={24} /> },
    { tab: "contacts", icon: <Phone size={24} /> },
  ];

  return {
    avatarUrl,
    loading,
    icons,
  };
};
