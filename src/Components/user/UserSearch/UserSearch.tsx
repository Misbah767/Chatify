"use client";

import React from "react";
import { FiSearch } from "react-icons/fi";

interface UserSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative w-full mb-6">
      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search users by name..."
        className="
          w-full
          pl-12
          px-5
          py-3
          rounded-xl
          border
          border-gray-700
          bg-gray-800
          text-white
          placeholder-gray-400
          focus:outline-none
          focus:ring-indigo-500
          focus:border-indigo-500
          transition
          duration-200
          shadow-sm
          hover:shadow-md
        "
      />
    </div>
  );
};

export default UserSearch;
