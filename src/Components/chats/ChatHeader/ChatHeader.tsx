"use client";

import React from "react";
import UserProfileSidebar from "../UserProfileSidebar/UserProfileSidebar";
import { useChatHeader } from "@/features/chats/hooks/useChatHeader";

interface Props {
  targetId?: string | null;
}

const ChatHeader: React.FC<Props> = ({ targetId }) => {
  const { user, avatar, openProfile, openUserProfile, closeUserProfile } =
    useChatHeader(targetId);

  if (!targetId) {
    return (
      <div className="h-16 flex items-center justify-center text-gray-400 bg-[#141414] border-b border-[#262626]">
        Select contact
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="h-20 bg-[#141414] flex items-center justify-between px-4 border-b border-[#262626]">
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={openUserProfile}
        >
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
            <img
              src={avatar}
              alt={user?.name || "User avatar"}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-white text-xl font-medium">
            {user?.name || "Loading..."}
          </p>
        </div>
      </div>

      {/* User Profile Sidebar */}
      <UserProfileSidebar
        open={openProfile}
        onClose={closeUserProfile}
        user={user}
      />
    </>
  );
};

export default ChatHeader;
