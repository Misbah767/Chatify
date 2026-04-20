"use client";

import React from "react";
import { User } from "@/redux/slices/user.slice";
import { useFriendRequestButton } from "@/features/friendRequests/hooks/useFriendRequestButton";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");
const DEFAULT_AVATAR = "/img/default-avatar.webp";

interface UserRowProps {
  user?: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  if (!user || !user._id) {
    console.warn("⚠ UserRow: user or user._id missing", user);
    return null;
  }

  const {
    sendRequest,
    cancelRequest,
    buttonText,
    buttonClass,
    relationshipStatus,
  } = useFriendRequestButton(user._id);

  return (
    <div className="flex items-center justify-between p-3 rounded-xl border bg-[#141414] border-[#262626] hover:bg-[#1a1a1a] transition-all duration-200">
      {/* LEFT SIDE */}
      <div className="flex items-center space-x-3">
        <img
          src={
            user.profilePic
              ? `${BASE_URL}${user.profilePic}`
              : "/img/default-avatar.webp"
          }
          alt={user.name}
          className="w-16 h-16 rounded-2xl object-cover border border-[#262626]"
        />
        <div>
          <p className="text-white text-sm font-medium">
            {user.name || "Unknown"}
          </p>
          <p className="text-gray-500 text-xs">{user.email || ""}</p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex space-x-2">
        {relationshipStatus === "pending" && (
          <button
            onClick={cancelRequest}
            className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
          >
            Cancel
          </button>
        )}

        <button
          disabled={relationshipStatus === "accepted"}
          onClick={sendRequest}
          className={`text-xs px-4 py-1.5 rounded-lg font-medium transition ${
            relationshipStatus === "accepted"
              ? "bg-green-600 text-white cursor-not-allowed"
              : buttonClass
          } hover:opacity-90`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default UserRow;
