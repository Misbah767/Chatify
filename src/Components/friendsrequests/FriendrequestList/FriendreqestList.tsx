"use client";

import React from "react";
import { useFriendRequests } from "@/features/friendRequests/hooks/useFriendRequests";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

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
      <p className="text-center text-gray-400 py-10">
        Loading friend requests...
      </p>
    );

  return (
    <div className="space-y-4 py-6 px-3 bg-[#141414] h-full overflow-y-auto">
      {/* ================= INCOMING ================= */}
      <h3 className="text-white text-lg font-semibold px-2">
        Incoming Requests
      </h3>

      {(!incoming || incoming.length === 0) && (
        <p className="text-gray-500 text-sm px-2">No incoming requests</p>
      )}

      {incoming.map((req) => {
        const user = req?.from;

        if (!user) return null; // ✅ prevent crash

        return (
          <div
            key={req._id}
            className="flex items-center justify-between p-3 rounded-xl border bg-[#141414] border-[#262626] hover:bg-[#1a1a1a] transition"
          >
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
                <p className="text-white text-lg font-medium">
                  {user.name || "Unknown"}
                </p>
              </div>
            </div>

            <div className="flex space-x-1 justify-between flex-col">
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
        );
      })}

      {/* ================= SENT ================= */}
      <h3 className="text-white text-lg font-semibold px-2 mt-6">
        Sent Requests
      </h3>

      {(!sent || sent.length === 0) && (
        <p className="text-gray-500 text-sm px-2">No sent requests</p>
      )}

      {sent.map((req) => {
        const user = req?.to;

        if (!user) return null; //  prevent crash

        return (
          <div
            key={req._id}
            className="flex items-center justify-between p-3 rounded-xl border bg-[#141414] border-[#262626] hover:bg-[#1a1a1a] transition"
          >
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
                <p className="text-white text-lg font-medium">
                  {user.name || "Unknown"}
                </p>
              </div>
            </div>

            <button
              onClick={() => cancelRequest(req._id)}
              className="px-3 py-1 text-xs bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white"
            >
              Cancel
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FriendRequestList;
