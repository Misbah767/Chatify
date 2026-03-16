"use client";

import { Play, Pause } from "lucide-react";
import { useVoiceMessage } from "@/features/chats/hooks/useVoiceMessage";

interface Props {
  src: string;
  isMe?: boolean;
}

export default function VoiceMessage({ src, isMe }: Props) {
  const {
    audioRef,
    playing,
    percent,
    bars,
    togglePlay,
    seek,
    format,
    progress,
    duration,
  } = useVoiceMessage(src);

  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-2xl w-[260px]
      ${isMe ? "bg-blue-500 text-white" : "bg-gray-700 text-white"}`}
    >
      {/* AUDIO */}
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* PLAY BUTTON */}
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-white text-black shrink-0"
      >
        {playing ? <Pause size={18} /> : <Play size={18} />}
      </button>

      {/* WAVEFORM */}
      <div className="flex items-end gap-[2px] flex-1 h-10 cursor-pointer">
        {bars.map((h, i) => {
          const active = i / bars.length <= percent;

          return (
            <div
              key={i}
              onClick={() => seek(i)}
              className={`w-[3px] rounded-full transition-all duration-200
              ${active ? "bg-white" : "bg-white/40"}`}
              style={{
                height: `${h}px`,
                transform: playing && active ? "scaleY(1.25)" : "scaleY(1)",
              }}
            />
          );
        })}
      </div>

      {/* TIME */}
      <div className="text-[11px] min-w-[40px] text-right">
        {format(progress)} / {format(duration)}
      </div>
    </div>
  );
}
