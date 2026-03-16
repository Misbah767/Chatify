"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { conversationService } from "@/services/conversationService";

// ================= CREATE OR GET =================
export const createOrGetConversation = createAsyncThunk(
  "conversations/createOrGet",
  async (otherUserId: string, { rejectWithValue }) => {
    // console.log(" createOrGetConversation thunk called");
    // console.log(" otherUserId:", otherUserId);

    try {
      const conversation = await conversationService.createOrGetConversation(
        otherUserId
      );

      // console.log("conversation created/fetched:", conversation);

      return conversation;
    } catch (err: any) {
      //   console.error(" createOrGetConversation error:", err);

      return rejectWithValue(
        err.response?.data?.message || "Failed to create conversation"
      );
    }
  }
);

// ================= FETCH USER CONVERSATIONS =================
export const fetchUserConversations = createAsyncThunk(
  "conversations/fetchUserConversations",
  async (_, { rejectWithValue }) => {
    // console.log("fetchUserConversations thunk called");

    try {
      const conversations = await conversationService.getUserConversations();

      // console.log("conversations fetched:", conversations);

      return conversations;
    } catch (err: any) {
      // console.error(" fetchUserConversations error:", err);

      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch conversations"
      );
    }
  }
);
