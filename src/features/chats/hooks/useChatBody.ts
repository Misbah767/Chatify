"use client";

import { useRef, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/auth.slice";

import { useMessages } from "@/features/messages/hooks/usemessages";
import { useUniqueMessages } from "./useUniqueMessages";
import { useChatUsers } from "@/features/chats/hooks/useChatUsers";
import { useChatRealtimeIndicators } from "./useChatRealtimeIndicators";
import { useAutoScroll } from "./useAutoScroll";
import { useSeenMessages } from "@/features/chats/hooks/useSeenMessages";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");
export const FALLBACK_AVATAR = "/default-avatar.png";

export interface ProcessedMessage {
  msg: any;
  isMe: boolean;
  avatar: string;
  name: string;
}

export function useChatBody(chatId?: string) {
  const { messages, markAsSeen } = useMessages(chatId);
  const currentUser = useSelector(selectUser);

  const bottomRef = useRef<HTMLDivElement>(null); // Type-safe RefObject
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const uniqueMessages = useUniqueMessages(messages);
  const userProfiles = useChatUsers(uniqueMessages);

  // Identify chat partner
  const partnerId = useMemo<string | null>(() => {
    if (!uniqueMessages?.length || !currentUser?._id) return null;

    const msg = uniqueMessages.find(
      (m: any) =>
        (typeof m.sender === "object" ? m.sender._id : m.sender) !==
        currentUser._id
    );

    if (!msg) return null;
    return typeof msg.sender === "object" ? msg.sender._id : msg.sender;
  }, [uniqueMessages, currentUser?._id]);

  const { typingUsers, recordingUsers } = useChatRealtimeIndicators(partnerId);

  // Auto scroll safely
  useAutoScroll(bottomRef, [uniqueMessages, typingUsers, recordingUsers]);

  // Mark messages as seen
  if (currentUser?._id) {
    useSeenMessages(uniqueMessages, currentUser._id, markAsSeen);
  }

  // Process messages for rendering
  const processedMessages: ProcessedMessage[] = useMemo(() => {
    return uniqueMessages.map((msg: any) => {
      const senderId =
        typeof msg.sender === "object" ? msg.sender._id : msg.sender;
      const isMe = senderId === currentUser?._id;
      const profile = userProfiles[senderId];

      const avatar = profile?.profilePic
        ? `${BASE_URL}${profile.profilePic}`
        : FALLBACK_AVATAR;

      const name = isMe ? "You" : profile?.name || "User";

      return { msg, isMe, avatar, name };
    });
  }, [uniqueMessages, currentUser?._id, userProfiles]);

  return {
    bottomRef,
    previewImage,
    setPreviewImage,
    processedMessages,
    typingUsers,
    recordingUsers,
  };
}
