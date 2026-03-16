"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export const useVoiceMessage = (src: string) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Stable fake waveform
  const bars = useMemo(
    () => Array.from({ length: 55 }, () => Math.floor(Math.random() * 22 + 8)),
    []
  );

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) audio.pause();
    else audio.play();
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => setProgress(audio.currentTime);

    const onLoaded = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };

    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onLoaded);
    audio.addEventListener("ended", onEnd);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onLoaded);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const percent = duration ? progress / duration : 0;

  const seek = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (index / bars.length) * duration;
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const format = (t: number) => {
    if (!t) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    audioRef,
    playing,
    progress,
    duration,
    percent,
    bars,
    togglePlay,
    seek,
    format,
  };
};
