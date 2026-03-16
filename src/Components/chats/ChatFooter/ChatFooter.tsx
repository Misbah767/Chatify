"use client";

import React from "react";
import { FiSend, FiPaperclip, FiMic, FiSmile, FiX } from "react-icons/fi";

import EmojiPickerPopup from "@/Components/chats/EmojiPickerPopup/EmojiPickerPopup";
import VoicePreview from "@/Components/chats/VoicePreview/VoicePreview";
import RecordingUI from "@/Components/chats/RecordingUI/RecordingUI";

import { useChatFooterUI } from "@/features/chats/hooks/useChatFooterUI";

interface Props {
  chatId?: string;
}

const ChatFooter: React.FC<Props> = ({ chatId }) => {
  const ui = useChatFooterUI(chatId);

  return (
    <div className="bg-gray-800 border-t mb-16 border-gray-700 p-3 flex flex-col relative">
      {/* BLOCKED OVERLAY */}
      {ui.isBlocked && (
        <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center text-white text-sm">
          You cannot send messages to this user
        </div>
      )}

      {/* VOICE PREVIEW */}
      {ui.voice.voicePreview && !ui.isBlocked && (
        <VoicePreview
          url={ui.voice.voicePreview}
          onDelete={() => ui.voice.setVoicePreview(null)}
          onSend={ui.sendVoice}
        />
      )}

      {/* RECORDING UI */}
      {ui.voice.recording && !ui.isBlocked && (
        <RecordingUI
          locked={ui.voice.lockedRecording}
          time={ui.voice.formatTime(ui.voice.recordSeconds)}
          onLock={() => ui.voice.setLockedRecording(true)}
          onCancel={ui.cancelRecording}
          onSend={ui.voice.stopRecording}
        />
      )}

      {/* FILE PREVIEW (inside input area) */}
      {ui.selectedFile && (
        <div className="flex items-center gap-2 mb-2 bg-gray-700 p-2 rounded-md">
          <span className="text-sm truncate flex-1">
            {ui.selectedFile.name}
          </span>
          <button onClick={ui.removeFile} className="cursor-pointer">
            <FiX />
          </button>
        </div>
      )}

      {/* CONTROLS */}
      <div
        className={`flex items-center gap-2 ${
          ui.isBlocked ? "pointer-events-none" : ""
        }`}
      >
        {/* EMOJI */}
        <button onClick={() => ui.setShowEmoji(!ui.showEmoji)}>
          <FiSmile size={20} />
        </button>

        {ui.showEmoji && !ui.isBlocked && (
          <EmojiPickerPopup
            onEmoji={(emoji) => ui.setMessage((prev) => prev + emoji)}
            onClose={() => ui.setShowEmoji(false)}
          />
        )}

        {/* FILE */}
        <button onClick={() => ui.fileRef.current?.click()}>
          <FiPaperclip size={20} />
        </button>

        <input
          type="file"
          hidden
          ref={ui.fileRef}
          onChange={ui.handleFileSelect}
        />

        {/* INPUT */}
        <input
          className="flex-1 bg-gray-700 px-3 py-2 rounded-md focus:outline-none"
          value={ui.message}
          onChange={(e) => ui.handleTyping(e.target.value)}
          onKeyDown={ui.handleKeyDown}
          placeholder="Type a message..."
          disabled={ui.isBlocked}
        />

        {/* SEND / MIC */}
        {ui.message || ui.selectedFile ? (
          <button onClick={ui.send} className="text-blue-400">
            <FiSend size={20} />
          </button>
        ) : (
          <button
            onMouseDown={ui.startRecording}
            onMouseUp={ui.stopRecording}
            className={`p-2 rounded-full ${
              ui.voice.recording ? "bg-red-500 text-white" : "text-gray-300"
            }`}
          >
            <FiMic size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatFooter;
