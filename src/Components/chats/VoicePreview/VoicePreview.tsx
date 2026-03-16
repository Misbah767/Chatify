"use client";

import { FiSend, FiTrash2 } from "react-icons/fi";

interface Props {
  url: string;
  onDelete: () => void;
  onSend: () => void;
}

const VoicePreview: React.FC<Props> = ({ url, onDelete, onSend }) => {
  return (
    <div className="flex items-center gap-3 bg-gray-900 p-2 rounded mb-2">
      <audio src={url} controls className="flex-1" />

      <button onClick={onDelete}>
        <FiTrash2 className="text-red-400" size={20} />
      </button>

      <button onClick={onSend}>
        <FiSend className="text-blue-400" size={20} />
      </button>
    </div>
  );
};

export default VoicePreview;
