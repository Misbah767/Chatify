"use client";

import React from "react";
import UserProfileCard from "@/Components/user/UserProfileCard/UserProfileCard";
import UserList from "@/Components/user/UserList/UserList";
import FriendRequestList from "@/Components/friendsrequests/FriendrequestList/FriendreqestList";
import ContactsList from "@/Components/contacts/ContactList/ContactList";

import { Tab } from "@/features/chats/types";

interface Props {
  activeTab: Tab | "profile" | "users" | "friendRequests" | "contacts";
  onSelectChat: (chat: any) => void;
  selectedChat?: any;
}

const LeftSidebarContent: React.FC<Props> = ({
  activeTab,
  onSelectChat,
  selectedChat,
}) => {
  const baseStyles =
    "bg-gray-800 overflow-y-auto w-full h-full md:w-78 md:h-full md:border-r border-gray-700 transition-transform duration-300";

  const mobilePadding = "pb-16 md:pb-0";

  const hideOnMobile = selectedChat ? "hidden md:flex" : "flex";

  return (
    <div className={`${baseStyles} ${mobilePadding} ${hideOnMobile} flex-col`}>
      {activeTab === "users" && <UserList />}
      {activeTab === "friendRequests" && <FriendRequestList />}
      {activeTab === "contacts" && (
        <ContactsList onSelectContact={onSelectChat} />
      )}

      {activeTab === "profile" && (
        <div className="p-4">
          <UserProfileCard />
        </div>
      )}
    </div>
  );
};

export default LeftSidebarContent;
