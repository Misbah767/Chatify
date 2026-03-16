import api from "./axios";

export const friendRequestService = {
  // Send friend request
  sendRequest: async (toId: string) => {
    const res = await api.post("/friend-requests/send", { toId });
    return res.data.data;
  },

  // Accept or reject request
  respondRequest: async (
    requestId: string,
    action: "accepted" | "rejected"
  ) => {
    const res = await api.put("/friend-requests/respond", {
      requestId,
      action,
    });
    return res.data.data;
  },

  // Cancel sent request

  // Cancel sent request
  cancelRequest: async (requestId: string) => {
    const res = await api.post("/friend-requests/cancel", { requestId });
    // return the requestId so slice can remove it from `sent`
    return { requestId };
  },
  // ... other functions unchanged

  // Incoming friend requests
  getIncomingRequests: async () => {
    const res = await api.get("/friend-requests/incoming");
    return res.data.data;
  },

  // Sent friend requests
  getSentRequests: async () => {
    const res = await api.get("/friend-requests/sent");
    return res.data.data;
  },

  // Get relationship status with a user
  getFriendStatus: async (userId: string) => {
    const res = await api.get(`/friend-requests/status/${userId}`);
    return res.data.data;
  },
};
