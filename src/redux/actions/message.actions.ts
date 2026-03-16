"use client";

import { createAsyncThunk } from "@reduxjs/toolkit";
import { messageService } from "@/services/messageService";

// ================= FETCH MESSAGES =================

export const fetchMessages = createAsyncThunk(
  "messages/fetch",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const data = await messageService.getMessages(conversationId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SEND TEXT =================

export const sendMessage = createAsyncThunk(
  "messages/send",
  async (
    payload: { receiverId: string; text: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await messageService.sendMessage(payload);

      // backend returns { message, conversation }
      return data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SEND FILE =================

export const sendFileMessage = createAsyncThunk(
  "messages/sendFile",
  async (
    payload: { receiverId: string; file: File; messageType: string },
    { rejectWithValue }
  ) => {
    try {
      const data = await messageService.sendFileMessage(payload);

      return data.message;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= SEEN =================

export const markMessageSeen = createAsyncThunk(
  "messages/seen",
  async (messageId: string, { rejectWithValue }) => {
    try {
      const data = await messageService.markMessageSeen(messageId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= DELETE =================

export const deleteMessage = createAsyncThunk(
  "messages/delete",
  async (messageId: string, { rejectWithValue }) => {
    try {
      const data = await messageService.deleteMessage(messageId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);

// ================= CLEAR =================

export const clearConversation = createAsyncThunk(
  "messages/clear",
  async (conversationId: string, { rejectWithValue }) => {
    try {
      const data = await messageService.clearConversation(conversationId);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  }
);
