"use client";

import { Check, CheckCheck, FileText, File } from "lucide-react";
import { useMessageBubble } from "@/features/messages/hooks/useMessageBubble";

interface Props {
  msg: any;
  isMe: boolean;
  avatar: string;
  name: string;
  onImageClick: (src: string) => void;
}

export default function MessageBubble({
  msg,
  isMe,
  avatar,
  name,
  onImageClick,
}: Props) {
  const { time, mediaSrc, fileName, isImage, isVideo, isAudio } =
    useMessageBubble(msg);

  return (
    <div className={`flex flex-col gap-1`}>
      <div
        className={`flex items-center gap-3 ${
          isMe ? "justify-end" : "justify-start"
        }`}
      >
        {/* LEFT AVATAR */}
        {!isMe && (
          <img
            src={avatar}
            className="w-8 h-8 rounded-full object-cover"
            alt="avatar"
          />
        )}

        {/* MESSAGE CONTENT */}
        <div className="flex flex-col">
          {/* NAME */}
          {msg.messageType === "text" && (
            <div className="text-[11px] text-gray-400 mb-1">{name}</div>
          )}

          {/* TEXT */}
          {msg.messageType === "text" && msg.text && (
            <div className="whitespace-pre-wrap wrap-break-words">
              {msg.text}
            </div>
          )}

          {/* IMAGE */}
          {isImage && mediaSrc && (
            <img
              src={mediaSrc}
              className="rounded-lg w-56 cursor-pointer hover:opacity-90 transition"
              onClick={() => onImageClick(mediaSrc)}
              alt="image"
            />
          )}

          {/* VIDEO */}
          {isVideo && mediaSrc && (
            <video src={mediaSrc} controls className="rounded-lg w-60" />
          )}

          {/* FILE */}
          {!isImage && !isVideo && !isAudio && mediaSrc && (
            <a
              href={mediaSrc}
              target="_blank"
              className="flex items-center gap-3 bg-black/30 p-3 rounded-lg hover:bg-black/40 transition"
            >
              {fileName.endsWith(".pdf") ? (
                <FileText size={26} className="text-red-400" />
              ) : (
                <File size={26} />
              )}

              <div className="flex flex-col text-sm">
                <span className="truncate max-w-45">{fileName}</span>
                <span className="text-xs text-gray-300">Download</span>
              </div>
            </a>
          )}

          {/* TIME & STATUS */}
          <div className="flex justify-end items-center gap-1 mt-1 text-xs">
            <span>{time}</span>

            {isMe && (
              <>
                {msg.status === "sent" && (
                  <Check className="w-4 h-4 text-gray-400" />
                )}

                {msg.status === "delivered" && (
                  <CheckCheck className="w-4 h-4 text-gray-400" />
                )}

                {msg.status === "seen" && (
                  <CheckCheck className="w-4 h-4 text-blue-400" />
                )}
              </>
            )}
          </div>
        </div>

        {/* RIGHT AVATAR */}
        {isMe && (
          <img
            src={avatar}
            className="w-8 h-8 rounded-full object-cover"
            alt="avatar"
          />
        )}
      </div>

      {/* AUDIO */}
      {isAudio && mediaSrc && (
        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
          <audio
            src={mediaSrc}
            controls
            className="w-60 rounded-lg border p-1 bg-green-50"
          />
        </div>
      )}
    </div>
  );
}
