"use client";

import React from "react";
import { User } from "@/redux/slices/user.slice";
import { useFriendRequestButton } from "@/features/friendRequests/hooks/useFriendRequestButton";

const BASE_URL = "http://localhost:5000";
const DEFAULT_AVATAR = "/img/default-avatar.webp";

interface UserRowProps {
  user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
  const {
    sendRequest,
    cancelRequest,
    buttonText,
    buttonClass,
    relationshipStatus,
  } = useFriendRequestButton(user._id);

  console.log(
    " [UserRow] Rendering:",
    user.name,
    "| Status:",
    relationshipStatus
  );

  return (
    <div className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-700 hover:bg-gray-800 transition-colors duration-150">
      <div className="flex items-center space-x-3">
        <img
          src={
            user.profilePic ? `${BASE_URL}${user.profilePic}` : DEFAULT_AVATAR
          }
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover border border-gray-700"
        />
        <p className="text-white text-sm font-medium">{user.name}</p>
      </div>

      <div className="flex space-x-2">
        {relationshipStatus === "pending" && (
          <button
            onClick={() => {
              // console.log(" [UserRow] Cancel clicked for:", user.name);
              cancelRequest();
            }}
            className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-lg text-white"
          >
            Cancel
          </button>
        )}

        <button
          disabled={relationshipStatus === "accepted"}
          onClick={() => {
            // console.log(" [UserRow] Send clicked for:", user.name);
            sendRequest();
          }}
          className={`text-xs px-4 py-1.5 rounded-lg font-medium ${buttonClass} hover:opacity-90 transition`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default UserRow;
