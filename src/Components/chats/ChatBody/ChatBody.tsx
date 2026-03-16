"use client";

import React, { useRef, useState, useMemo } from "react";
import { useMessages } from "@/features/messages/hooks/usemessages";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/slices/auth.slice";

import { useUniqueMessages } from "@/features/chats/hooks/useUniqueMessages";
import { useChatUsers } from "@/features/chats/hooks/useChatUsers";
import { useChatRealtimeIndicators } from "@/features/chats/hooks/useChatRealtimeIndicators";
import { useAutoScroll } from "@/features/chats/hooks/useAutoScroll";
import { useSeenMessages } from "@/features/chats/hooks/useSeenMessages";

import MessageBubble from "@/Components/chats/MessageBubble/MessageBubble";
import TypingIndicator from "@/Components/chats/TypingIndicator/TypingIndicator";
import RecordingIndicator from "@/Components/chats/RecordingIndicator/RecordingIndicator";
import ImagePreviewModal from "@/Components/chats/ImagePreviewModal/ImagePreviewModal";

const BASE_URL = "http://localhost:5000";
const FALLBACK_AVATAR = "/default-avatar.png";

export default function ChatBody({ chatId }: { chatId?: string }) {
  const { messages, markAsSeen } = useMessages(chatId);
  const currentUser = useSelector(selectUser);

  const bottomRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const uniqueMessages = useUniqueMessages(messages);
  const userProfiles = useChatUsers(uniqueMessages);

  const partnerId = useMemo(() => {
    if (!uniqueMessages?.length || !currentUser?._id) return null;

    const msg = uniqueMessages.find(
      (m: any) =>
        (typeof m.sender === "object" ? m.sender._id : m.sender) !==
        currentUser._id
    );

    return msg
      ? typeof msg.sender === "object"
        ? msg.sender._id
        : msg.sender
      : null;
  }, [uniqueMessages, currentUser?._id]);

  const { typingUsers, recordingUsers } = useChatRealtimeIndicators(partnerId);

  useAutoScroll(bottomRef, [uniqueMessages, typingUsers, recordingUsers]);
  useSeenMessages(uniqueMessages, currentUser?._id, markAsSeen);

  if (!chatId)
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Scrollable Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {uniqueMessages.map((msg: any) => {
          const senderId =
            typeof msg.sender === "object" ? msg.sender._id : msg.sender;
          const isMe = senderId === currentUser?._id;
          const profile = userProfiles[senderId];

          const avatar = profile?.profilePic
            ? `${BASE_URL}${profile.profilePic}`
            : FALLBACK_AVATAR;

          const name = isMe ? "You" : profile?.name || "User";

          return (
            <MessageBubble
              key={msg._id}
              msg={msg}
              isMe={isMe}
              avatar={avatar}
              name={name}
              onImageClick={setPreviewImage}
            />
          );
        })}

        {/* Typing & Recording Indicators */}
        <TypingIndicator visible={typingUsers.length > 0} />
        <RecordingIndicator visible={recordingUsers.length > 0} />

        <div ref={bottomRef} />
      </div>

      {/* Image Preview Modal */}
      <ImagePreviewModal
        src={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
