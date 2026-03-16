"use client";

import React from "react";
import { Tab } from "@/features/chats/types";
import { useLeftSidebarIcons } from "@/features/chats/hooks/useLeftSidebarIcons";

interface Props {
  activeTab: Tab | "profile" | "users" | "friendRequests" | "contacts";
  setActiveTab: (
    tab: Tab | "profile" | "users" | "friendRequests" | "contacts"
  ) => void;
}

const LeftSidebarIcons: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { avatarUrl, loading, icons } = useLeftSidebarIcons();

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <div className="hidden md:flex md:flex-col md:w-16 md:h-full bg-gray-900 border-r border-gray-700 justify-between  py-4 pb-6">
        {/* Top icons */}
        <div className="flex flex-col items-center space-y-6 ">
          {icons.map((i) => (
            <button
              key={i.tab.toString()}
              onClick={() => setActiveTab(i.tab)}
              className={`p-2 rounded-md transition ${
                activeTab === i.tab
                  ? "bg-gray-700 cursor-pointer text-white"
                  : "text-gray-400 cursor-pointer hover:bg-gray-700 hover:text-white"
              }`}
            >
              {i.icon}
            </button>
          ))}
        </div>

        {/* Bottom Profile (SAFE from hiding) */}
        <div className="flex flex-col items-center space-y-4 mb-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-10 h-10 rounded-full overflow-hidden border-2 transition ${
              activeTab === "profile"
                ? "border-blue-500"
                : "border-gray-600 hover:border-gray-400"
            }`}
          >
            {loading ? (
              <div className="w-full h-full bg-gray-700 animate-pulse" />
            ) : (
              <img
                src={avatarUrl}
                alt="User"
                className="w-full h-full object-cover"
              />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE BOTTOM BAR ================= */}
      <div className="fixed bottom-0   cursor-pointer  left-0 w-full md:hidden pt-4 bg-gray-900 border-t border-gray-700 flex justify-around z-50">
        {icons.map((i) => (
          <button
            key={i.tab.toString()}
            onClick={() => setActiveTab(i.tab)}
            className={`flex flex-col items-center p-4 mt-2 rounded-md transition ${
              activeTab === i.tab
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-700 hover:text-white"
            }`}
          >
            {i.icon}
          </button>
        ))}

        {/* Floating Profile */}
        <div className="relative ">
          <button
            onClick={() => setActiveTab("profile")}
            className={`w-10 h-10 rounded-full p-7 mt-3 overflow-hidden border-2 transition ${
              activeTab === "profile"
                ? "border-blue-500 "
                : "border-gray-600  hover:border-gray-400"
            }`}
          >
            {loading ? (
              <div className="w-full h-full bg-gray-700  animate-pulse" />
            ) : (
              <img
                src={avatarUrl}
                alt="User"
                className="w-full h-full object-cover"
              />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarIcons;
