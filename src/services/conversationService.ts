"use client";

import api from "./axios";

export const conversationService = {
  // ================= CREATE OR GET CONVERSATION =================
  createOrGetConversation: async (otherUserId: string) => {
    // console.log(" conversationService.createOrGetConversation called");
    // console.log(" otherUserId:", otherUserId);

    if (!otherUserId) {
      throw new Error("otherUserId must be provided");
    }

    try {
      const res = await api.post("/conversations", {
        otherUserId,
      });

      // console.log(" conversationService response:", res.data);

      if (!res.data || !res.data.data) {
        throw new Error("Invalid response from server");
      }

      return res.data.data;
    } catch (err: any) {
      // console.error(
      //   "conversationService.createOrGetConversation error:",
      //   err.response?.data || err.message
      // );
      throw err;
    }
  },

  // ================= GET USER CONVERSATIONS =================
  getUserConversations: async () => {
    // console.log(" conversationService.getUserConversations called");

    try {
      const res = await api.get("/conversations");

      // console.log(" conversations fetched:", res.data);

      if (!res.data || !res.data.data) {
        throw new Error("Invalid response from server");
      }

      return res.data.data;
    } catch (err: any) {
      // console.error(
      //   " conversationService.getUserConversations error:",
      //   err.response?.data || err.message
      // );
      throw err;
    }
  },
};
