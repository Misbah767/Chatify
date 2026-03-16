import { useEffect, useState } from "react";
import {
  onTypingStart,
  onTypingStop,
  onRecordingStart,
  onRecordingStop,
} from "@/socket/messageSocketClient";

export const useChatRealtimeIndicators = (partnerId: string | null) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [recordingUsers, setRecordingUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!partnerId) return;

    const handleTypingStart = (senderId: string) => {
      if (senderId !== partnerId) return;
      setTypingUsers([senderId]);
    };

    const handleTypingStop = (senderId: string) => {
      if (senderId !== partnerId) return;
      setTypingUsers([]);
    };

    const handleRecordingStart = (senderId: string) => {
      if (senderId !== partnerId) return;
      setRecordingUsers([senderId]);
    };

    const handleRecordingStop = (senderId: string) => {
      if (senderId !== partnerId) return;
      setRecordingUsers([]);
    };

    onTypingStart(handleTypingStart);
    onTypingStop(handleTypingStop);
    onRecordingStart(handleRecordingStart);
    onRecordingStop(handleRecordingStop);

    // Optional cleanup if your socket library supports off
    return () => {
      // remove listeners if needed
    };
  }, [partnerId]);

  return { typingUsers, recordingUsers };
};
