"use client";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

export const useUserProfileSidebar = (user: any) => {
  const avatar = user?.profilePic
    ? `${BASE_URL}${user.profilePic}`
    : "/img/default-avatar.webp";

  return {
    avatar,
  };
};
