"use client";

import React, { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  onClose: () => void;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  open,
  title,
  children,
  actions,
  onClose,
  showCloseButton = true,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#111] rounded-xl w-full max-w-md p-6 text-white shadow-lg relative">
        {/* Close Button */}
        {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white transition"
          >
            ✕
          </button>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>

        {/* Content */}
        <div className="max-h-[70vh] overflow-y-auto">{children}</div>

        {/* Actions */}
        {actions && (
          <div className="mt-4 flex justify-end gap-2">{actions}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
