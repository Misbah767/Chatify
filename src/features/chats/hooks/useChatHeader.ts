"use client";

import { useState } from "react";
import { useUserProfile } from "@/features/messages/hooks/useUserProfile";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const useChatHeader = (targetId?: string | null) => {
  const user = useUserProfile(targetId || undefined);

  const [openProfile, setOpenProfile] = useState(false);

  const openUserProfile = () => setOpenProfile(true);
  const closeUserProfile = () => setOpenProfile(false);

  const avatar = user?.profilePic
    ? `${BASE_URL}${user.profilePic}`
    : "/img/default-avatar.webp";

  return {
    user,
    avatar,
    openProfile,
    openUserProfile,
    closeUserProfile,
  };
};
