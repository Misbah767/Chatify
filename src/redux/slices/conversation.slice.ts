"use client";

import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  fetchUserConversations,
  createOrGetConversation,
} from "../actions/conversation.actions";

export interface UserSummary {
  _id: string;
  name?: string;
  profilePic?: string;
}

export interface Conversation {
  _id: string;
  participants: UserSummary[];
  lastMessage?: {
    text?: string;
    mediaUrl?: string;
    messageType?: string;
    sender?: UserSummary;
    createdAt?: string;
    status?: string;
  };
  unreadCounts?: Record<string, number>;
  updatedAt?: string;
}

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    clearConversationsState(state) {
      state.conversations = [];
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchUserConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createOrGetConversation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrGetConversation.fulfilled, (state, action) => {
        state.loading = false;
        const exists = state.conversations.find(
          (c) => c._id === action.payload._id
        );
        if (!exists) state.conversations.unshift(action.payload);
      })
      .addCase(createOrGetConversation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearConversationsState, clearError } =
  conversationSlice.actions;
export default conversationSlice.reducer;

// ---------------- SELECTORS ----------------
export const selectConversations = (state: RootState) =>
  state.conversations.conversations;
export const selectConversationsLoading = (state: RootState) =>
  state.conversations.loading;
export const selectConversationsError = (state: RootState) =>
  state.conversations.error;
export const selectConversationById = (state: RootState, id: string) =>
  state.conversations.conversations.find((c) => c._id === id);
