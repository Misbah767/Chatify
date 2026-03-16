"use client";

import React from "react";
import { useFriendRequests } from "@/features/friendRequests/hooks/useFriendRequests";

const BASE_URL = "http://localhost:5000";

const FriendRequestList: React.FC = () => {
  const {
    incoming,
    sent,
    loading,
    acceptRequest,
    rejectRequest,
    cancelRequest,
  } = useFriendRequests();

  if (loading)
    return (
      <div className="p-6 text-gray-400 flex justify-center">
        Loading friend requests...
      </div>
    );

  return (
    <div className="p-4 w-full h-full flex flex-col space-y-4 overflow-y-auto">
      <h3 className="text-white font-semibold mb-2">
        Incoming Friend Requests
      </h3>

      {incoming.length === 0 && (
        <p className="text-gray-400 text-sm">No incoming requests</p>
      )}

      {incoming.map((req) => (
        <div
          key={req._id}
          className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <img
              src={
                req.from.profilePic
                  ? `${BASE_URL}${req.from.profilePic}`
                  : "/img/default-avatar.webp"
              }
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="text-white text-sm">{req.from.name}</p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => acceptRequest(req._id)}
              className="px-3 py-1 text-xs bg-green-500 hover:bg-green-600 rounded-lg text-white"
            >
              Accept
            </button>

            <button
              onClick={() => rejectRequest(req._id)}
              className="px-3 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-lg text-white"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      <h3 className="text-white font-semibold mt-6 mb-2">
        Sent Friend Requests
      </h3>

      {sent.length === 0 && (
        <p className="text-gray-400 text-sm">No sent requests</p>
      )}

      {sent.map((req) => (
        <div
          key={req._id}
          className="flex items-center justify-between p-3 bg-gray-900 rounded-xl border border-gray-700"
        >
          <div className="flex items-center space-x-3">
            <img
              src={
                req.to.profilePic
                  ? `${BASE_URL}${req.to.profilePic}`
                  : "/public/img/default-avatar.webp"
              }
              alt="img"
              className="w-12 h-12 rounded-full object-cover"
            />
            <p className="text-white text-sm">{req.to.name}</p>
          </div>

          <button
            onClick={() => cancelRequest(req._id)}
            className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
