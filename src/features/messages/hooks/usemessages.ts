"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";

import { selectUser } from "@/redux/slices/auth.slice";
import {
  selectMessages,
  addMessage,
  markMessageSeenLocal,
} from "@/redux/slices/message.slice";

import {
  fetchMessages,
  sendMessage,
  sendFileMessage,
  markMessageSeen,
} from "@/redux/actions/message.actions";

import {
  initMessageSocket,
  sendTextSocket,
  sendMediaSocket,
  seenSocket,
  startTyping,
  stopTyping,
  startRecordingSocket,
  stopRecordingSocket,
} from "@/socket/messageSocketClient";

interface UseMessagesReturn {
  messages: any[];
  loading: boolean;
  sendText: (receiverId: string, text: string) => void;
  sendFile: (receiverId: string, file: File, type: string) => void;
  markAsSeen: (messageId: string) => void;

  startTypingIndicator: (receiverId: string) => void;
  stopTypingIndicator: (receiverId: string) => void;

  startRecordingIndicator: (receiverId: string) => void;
  stopRecordingIndicator: (receiverId: string) => void;

  typingUsers: string[];
  recordingUsers: string[];
}

export const useMessages = (conversationId?: string): UseMessagesReturn => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser);

  const allMessages = useSelector(selectMessages);
  const loading = useSelector((state: any) => state.messages.loading);

  // typing/recording states remain (UI still depends on them)
  const typingUsers: string[] = [];
  const recordingUsers: string[] = [];

  // ================= FILTER CONVERSATION MESSAGES =================
  const messages = useMemo(() => {
    if (!conversationId) return [];

    return allMessages
      .filter((m: any) => m.conversation === conversationId)
      .sort(
        (a: any, b: any) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  }, [allMessages, conversationId]);

  // ================= SOCKET INIT =================
  useEffect(() => {
    if (!user?._id) return;

    initMessageSocket(user._id);
  }, [user?._id]);

  // ================= FETCH HISTORY =================
  useEffect(() => {
    if (!conversationId) return;

    dispatch(fetchMessages(conversationId));
  }, [conversationId, dispatch]);

  // ================= SEND TEXT =================
  const sendText = async (receiverId: string, text: string) => {
    if (!text.trim() || !user?._id) return;

    try {
      const result: any = await dispatch(
        sendMessage({ receiverId, text })
      ).unwrap();

      dispatch(addMessage(result));

      sendTextSocket(result);
    } catch (err) {
      console.error("send message error", err);
    }
  };

  // ================= SEND FILE =================
  const sendFile = async (
    receiverId: string,
    file: File,
    messageType: string
  ) => {
    if (!user?._id) return;

    try {
      const result: any = await dispatch(
        sendFileMessage({ receiverId, file, messageType })
      ).unwrap();

      dispatch(addMessage(result));

      sendMediaSocket(result);
    } catch (err) {
      console.error("file send error", err);
    }
  };

  // ================= SEEN =================
  const markAsSeen = async (messageId: string) => {
    if (!user?._id) return;

    try {
      await dispatch(markMessageSeen(messageId));

      dispatch(markMessageSeenLocal(messageId));

      seenSocket(messageId, user._id);
    } catch (err) {
      console.error("seen error", err);
    }
  };

  // ================= TYPING =================
  const startTypingIndicator = (receiverId: string) => {
    if (!user?._id) return;
    startTyping(user._id, receiverId);
  };

  const stopTypingIndicator = (receiverId: string) => {
    if (!user?._id) return;
    stopTyping(user._id, receiverId);
  };

  // ================= RECORDING =================
  const startRecordingIndicator = (receiverId: string) => {
    if (!user?._id) return;
    startRecordingSocket(user._id, receiverId);
  };

  const stopRecordingIndicator = (receiverId: string) => {
    if (!user?._id) return;
    stopRecordingSocket(user._id, receiverId);
  };

  return {
    messages,
    loading,
    sendText,
    sendFile,
    markAsSeen,

    startTypingIndicator,
    stopTypingIndicator,

    startRecordingIndicator,
    stopRecordingIndicator,

    typingUsers,
    recordingUsers,
  };
};
