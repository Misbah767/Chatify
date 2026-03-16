"use client";

import { FiLock, FiSend, FiX } from "react-icons/fi";

interface Props {
  locked: boolean;
  time: string;
  onLock: () => void;
  onCancel: () => void;
  onSend: () => void;
}

const RecordingUI: React.FC<Props> = ({
  locked,
  time,
  onLock,
  onCancel,
  onSend,
}) => {
  return (
    <div className="flex items-center justify-between bg-red-500/20 px-4 py-2 rounded mb-2">
      <div className="flex items-center gap-2 text-red-400"> Recording</div>

      <div className="font-mono text-white">{time}</div>

      <div className="flex items-center gap-3">
        {!locked && (
          <button onClick={onLock} className="text-yellow-400">
            <FiLock size={18} />
          </button>
        )}

        <button onClick={onCancel}>
          <FiX size={18} />
        </button>

        {locked && (
          <button onClick={onSend} className="text-green-400">
            <FiSend size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default RecordingUI;
