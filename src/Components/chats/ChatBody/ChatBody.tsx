"use client";

import React from "react";
import MessageBubble from "@/Components/chats/MessageBubble/MessageBubble";
import TypingIndicator from "@/Components/chats/TypingIndicator/TypingIndicator";
import RecordingIndicator from "@/Components/chats/RecordingIndicator/RecordingIndicator";
import ImagePreviewModal from "@/Components/chats/ImagePreviewModal/ImagePreviewModal";

import { useChatBody } from "@/features/chats/hooks/useChatBody";

export default function ChatBody({ chatId }: { chatId?: string }) {
  const {
    bottomRef,
    previewImage,
    setPreviewImage,
    processedMessages,
    typingUsers,
    recordingUsers,
  } = useChatBody(chatId);

  if (!chatId)
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        Select a chat
      </div>
    );

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        {processedMessages.map(({ msg, isMe, avatar, name }) => (
          <MessageBubble
            key={msg._id}
            msg={msg}
            isMe={isMe}
            avatar={avatar}
            name={name}
            onImageClick={setPreviewImage}
          />
        ))}

        <TypingIndicator visible={typingUsers.length > 0} />
        <RecordingIndicator visible={recordingUsers.length > 0} />

        <div ref={bottomRef} />
      </div>

      <ImagePreviewModal
        src={previewImage}
        onClose={() => setPreviewImage(null)}
      />
    </div>
  );
}
