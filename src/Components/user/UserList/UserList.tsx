"use client";

import React from "react";
import { useUserList } from "@/features/users/hooks/useUserList";
import UserRow from "../UserRow/UserRow";
import UserSearch from "../UserSearch/UserSearch";

const UserList: React.FC = () => {
  const { searchTerm, setSearchTerm, filteredUsers, loading, error } =
    useUserList();

  return (
    <div className="p-4 w-full h-full flex flex-col">
      {/* SEARCH */}
      <UserSearch searchTerm={searchTerm} onSearch={setSearchTerm} />

      <div className="mt-6 space-y-4 overflow-y-auto flex-1">
        {loading && (
          <p className="text-gray-400 text-center mt-6">Loading users...</p>
        )}
        {error && <p className="text-red-400 text-center mt-6">{error}</p>}

        {filteredUsers.map((user) => (
          <UserRow key={user._id} user={user} />
        ))}

        {!loading &&
          !error &&
          filteredUsers.length === 0 &&
          searchTerm.trim() && (
            <p className="text-gray-400 text-center mt-6">No users found</p>
          )}
      </div>
    </div>
  );
};

export default UserList;
