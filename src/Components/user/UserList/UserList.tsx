"use client";

import React from "react";
import { useUserList } from "@/features/users/hooks/useUserList";
import UserRow from "../UserRow/UserRow";
import UserSearch from "../UserSearch/UserSearch";

const UserList: React.FC = () => {
  const { searchTerm, setSearchTerm, filteredUsers, loading, error } =
    useUserList();

  return (
    <div className="p-4 w-full h-full flex flex-col bg-[#0f0f0f]">
      {/* SEARCH */}
      <UserSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      {/* LIST WRAPPER */}
      <div className="mt-6 space-y-3 overflow-y-auto flex-1 pr-1">
        {/* LOADING */}
        {loading && (
          <p className="text-gray-500 text-center mt-6">Loading users...</p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-red-400 text-center mt-6 font-medium">{error}</p>
        )}

        {/* USERS */}
        {!loading &&
          !error &&
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-[#141414] border border-[#262626] rounded-xl hover:bg-[#1a1a1a] transition-all duration-200"
            >
              <UserRow user={user} />
            </div>
          ))}

        {/* EMPTY STATE */}
        {!loading &&
          !error &&
          filteredUsers.length === 0 &&
          searchTerm.trim() && (
            <p className="text-gray-500 text-center mt-6">No users found</p>
          )}
      </div>
    </div>
  );
};

export default UserList;
