"use client";

import { useState, useRef } from "react";
import { useMessages } from "@/features/messages/hooks/usemessages";
import { useChatReceiver } from "@/features/messages/hooks/useChatReceiver";
import { useVoiceRecorder } from "@/features/messages/hooks/useVoiceRecorder";
import { useContacts } from "@/features/contacts/hooks/useContacts";

export const useChatFooterUI = (chatId?: string) => {
  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const receiver = useChatReceiver(chatId);
  const { contacts } = useContacts();
  const voice = useVoiceRecorder();

  const {
    sendText,
    sendFile,
    startTypingIndicator,
    stopTypingIndicator,
    startRecordingIndicator,
    stopRecordingIndicator,
  } = useMessages(chatId);

  const contact = contacts.find((c) => c._id === receiver?._id);
  const isBlocked = contact?.status === "blocked";

  /* ---------- SEND ---------- */
  const send = () => {
    if (!receiver || isBlocked) return;

    stopTypingIndicator(receiver._id);

    if (selectedFile) {
      sendFile(receiver._id, selectedFile, "file");
      setSelectedFile(null);
      return;
    }

    if (!message.trim()) return;

    sendText(receiver._id, message);
    setMessage("");
  };

  /* ---------- ENTER SEND ---------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") send();
  };

  /* ---------- TYPING ---------- */
  const handleTyping = (value: string) => {
    if (isBlocked) return;

    setMessage(value);
    if (!receiver) return;

    if (!value.trim()) {
      stopTypingIndicator(receiver._id);
      return;
    }

    startTypingIndicator(receiver._id);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(
      () => stopTypingIndicator(receiver._id),
      2000
    );
  };

  /* ---------- FILE ---------- */
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isBlocked) return;
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const removeFile = () => setSelectedFile(null);

  /* ---------- VOICE ---------- */
  const startRecording = () => {
    if (!receiver || isBlocked) return;
    startRecordingIndicator(receiver._id);
    voice.startRecording();
  };

  const stopRecording = () => {
    if (!receiver || isBlocked) return;
    stopRecordingIndicator(receiver._id);
    if (!voice.lockedRecording) voice.stopRecording();
  };

  const cancelRecording = () => {
    if (!receiver) return;
    stopRecordingIndicator(receiver._id);
    voice.cancelRecording();
  };

  const sendVoice = () => {
    if (!receiver || !voice.voiceFile || isBlocked) return;

    stopRecordingIndicator(receiver._id);
    sendFile(receiver._id, voice.voiceFile, "voice");

    voice.setVoicePreview(null);
    voice.setVoiceFile(null);
  };

  return {
    message,
    setMessage,
    showEmoji,
    setShowEmoji,
    selectedFile,
    fileRef,
    receiver,
    voice,
    isBlocked,

    send,
    handleTyping,
    handleFileSelect,
    removeFile,
    handleKeyDown,

    startRecording,
    stopRecording,
    cancelRecording,
    sendVoice,
  };
};
