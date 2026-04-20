"use client";

import React from "react";
import { Tab } from "@/features/chats/types";
import { useLeftSidebarIcons } from "@/features/chats/hooks/useLeftSidebarIcons";

interface Props {
  activeTab: Tab | "profile" | "users" | "friendRequests" | "contacts";
  setActiveTab: (tab: any) => void;
  closeChat: () => void;
}

const LeftSidebarIcons: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  closeChat,
}) => {
  const { avatarUrl, loading, icons } = useLeftSidebarIcons();

  const handleClick = (tab: any) => {
    setActiveTab(tab);

    // only close chat when switching away from contacts/chat context
    if (tab !== "contacts") {
      closeChat();
    }
  };

  return (
    <>
      {/* DESKTOP */}
      <div className="hidden md:flex md:flex-col md:w-16 md:h-full bg-[#141414] border-r border-[#262626] justify-between py-4 pb-6">
        <div className="flex flex-col items-center space-y-6">
          {icons.map((i) => (
            <button
              key={i.tab.toString()}
              onClick={() => handleClick(i.tab)}
              className={`p-2 rounded-md transition ${
                activeTab === i.tab
                  ? "bg-[#262626] text-white"
                  : "text-gray-400 hover:bg-[#262626] hover:text-white"
              }`}
            >
              {i.icon}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center space-y-4 mb-2">
          <button
            onClick={() => handleClick("profile")}
            className="w-10 h-10 rounded-full overflow-hidden border border-[#262626]"
          >
            {loading ? (
              <div className="w-full h-full bg-[#262626] animate-pulse" />
            ) : (
              <img src={avatarUrl} className="w-full h-full object-cover" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE */}
      <div className="fixed bottom-0 left-0 w-full md:hidden bg-[#141414] border-t border-[#262626] flex justify-around z-50">
        {icons.map((i) => (
          <button
            key={i.tab.toString()}
            onClick={() => handleClick(i.tab)}
            className={`flex flex-col items-center p-3 transition ${
              activeTab === i.tab ? "text-white" : "text-gray-400"
            }`}
          >
            {i.icon}
          </button>
        ))}

        <button
          onClick={() => handleClick("profile")}
          className="w-10 h-10 rounded-full overflow-hidden border border-[#262626] mt-2"
        >
          {loading ? (
            <div className="w-full h-full bg-[#262626] animate-pulse" />
          ) : (
            <img src={avatarUrl} className="w-full h-full object-cover" />
          )}
        </button>
      </div>
    </>
  );
};

export default LeftSidebarIcons;
