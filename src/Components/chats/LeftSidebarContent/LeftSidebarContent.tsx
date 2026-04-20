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
  return (
    <div className="bg-[#141414] w-full h-full md:w-78 border-r border-[#262626] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {activeTab === "users" && <UserList />}

        {activeTab === "friendRequests" && <FriendRequestList />}

        {activeTab === "contacts" && (
          <ContactsList
            onSelectContact={onSelectChat}
            selectedContactId={selectedChat?._id}
          />
        )}

        {activeTab === "profile" && (
          <div className="p-4">
            <UserProfileCard />
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebarContent;
