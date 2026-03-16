"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import {
  fetchMessages,
  sendMessage,
  sendFileMessage,
  deleteMessage,
  markMessageSeen,
} from "../actions/message.actions";

export interface Message {
  _id: string;
  conversation: string;
  sender: any;
  receiver: any;
  text?: string;
  mediaUrl?: string;
  messageType: string;
  status?: "sent" | "delivered" | "seen";
  createdAt?: string;
}

interface TypingState {
  [userId: string]: boolean;
}

interface State {
  messages: Message[];
  typing: TypingState;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  messages: [],
  typing: {},
  loading: false,
  error: null,
};

const slice = createSlice({
  name: "messages",
  initialState,

  reducers: {
    // ================= ADD MESSAGE =================

    addMessage: (state, action: PayloadAction<Message>) => {
      const exists = state.messages.find((m) => m._id === action.payload._id);

      if (!exists) {
        state.messages.push(action.payload);
      }
    },

    // ================= DELIVERED =================

    markMessageDeliveredLocal: (state, action: PayloadAction<string>) => {
      const msg = state.messages.find((m) => m._id === action.payload);

      if (msg) {
        msg.status = "delivered";
      }
    },

    // ================= SEEN =================

    markMessageSeenLocal: (state, action: PayloadAction<string>) => {
      const msg = state.messages.find((m) => m._id === action.payload);

      if (msg) {
        msg.status = "seen";
      }
    },

    // ================= DELETE LOCAL =================

    deleteLocal: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((m) => m._id !== action.payload);
    },

    // ================= TYPING =================

    setTyping: (
      state,
      action: PayloadAction<{ userId: string; typing: boolean }>
    ) => {
      state.typing[action.payload.userId] = action.payload.typing;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= FETCH =================

      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })

      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ================= SEND TEXT =================

      .addCase(sendMessage.fulfilled, (state, action) => {
        const exists = state.messages.find((m) => m._id === action.payload._id);

        if (!exists) {
          state.messages.push(action.payload);
        }
      })

      // ================= SEND FILE =================

      .addCase(sendFileMessage.fulfilled, (state, action) => {
        const exists = state.messages.find((m) => m._id === action.payload._id);

        if (!exists) {
          state.messages.push(action.payload);
        }
      })

      // ================= SEEN =================

      .addCase(markMessageSeen.fulfilled, (state, action) => {
        const msg = state.messages.find((m) => m._id === action.payload._id);

        if (msg) {
          msg.status = "seen";
        }
      })

      // ================= DELETE =================

      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(
          (m) => m._id !== action.payload._id
        );
      });
  },
});

export const {
  addMessage,
  markMessageSeenLocal,
  markMessageDeliveredLocal,
  deleteLocal,
  setTyping,
} = slice.actions;

export default slice.reducer;

export const selectMessages = (state: RootState) => state.messages.messages;

export const selectTyping = (state: RootState) => state.messages.typing;
