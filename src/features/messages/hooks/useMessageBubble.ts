"use client";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

export const useMessageBubble = (msg: any) => {
  const time = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const mediaSrc = msg.mediaUrl ? `${BASE_URL}${msg.mediaUrl}` : "";
  const fileName = msg.mediaUrl?.split("/").pop() || "";

  const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
  const isVideo = /\.(mp4|webm|ogg|mov)$/i.test(fileName);
  const isAudio = /\.(mp3|wav|m4a|ogg)$/i.test(fileName);

  return {
    time,
    mediaSrc,
    fileName,
    isImage,
    isVideo,
    isAudio,
  };
};
