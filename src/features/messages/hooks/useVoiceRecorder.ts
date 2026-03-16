"use client";

import { useRef, useState } from "react";

export const useVoiceRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [lockedRecording, setLockedRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const [voicePreview, setVoicePreview] = useState<string | null>(null);
  const [voiceFile, setVoiceFile] = useState<File | null>(null);

  const timerRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const recorder = new MediaRecorder(stream);

    audioChunksRef.current = [];

    recorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    recorder.start();

    mediaRecorderRef.current = recorder;
    setRecording(true);

    timerRef.current = setInterval(() => {
      setRecordSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.onstop = () => {
      clearInterval(timerRef.current);

      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      const file = new File([blob], "voice-message.webm", {
        type: "audio/webm",
      });

      const url = URL.createObjectURL(blob);

      setVoicePreview(url);
      setVoiceFile(file);

      setRecordSeconds(0);
      audioChunksRef.current = [];
    };

    recorder.stop();
    setRecording(false);
    setLockedRecording(false);
  };

  const cancelRecording = () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder) return;

    recorder.stop();
    clearInterval(timerRef.current);

    audioChunksRef.current = [];
    setRecording(false);
    setLockedRecording(false);
    setRecordSeconds(0);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return {
    recording,
    lockedRecording,
    setLockedRecording,
    recordSeconds,
    voicePreview,
    voiceFile,
    setVoicePreview,
    setVoiceFile,
    startRecording,
    stopRecording,
    cancelRecording,
    formatTime,
  };
};