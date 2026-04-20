"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserProfileSidebar } from "@/features/users/hooks/useUserProfileSidebar";

interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
}

const UserProfileSidebar: React.FC<Props> = ({ open, onClose, user }) => {
  const { avatar } = useUserProfileSidebar(user);

  return (
    <AnimatePresence>
      {open && user && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bg-black right-0 top-0 h-full w-80 border-l border-gray-700 p-6 flex flex-col overflow-hidden "
        >
          {/* Glow Shapes */}
          <div className="absolute top-0 -left-12 w-72 h-72 md:w-96 md:h-96 bg-[#4a5df9] opacity-20 blur-[100px]" />
          <div className="absolute bottom-0 -right-12 w-72 h-72 md:w-96 md:h-96 bg-cyan-500 opacity-20 blur-[100px]" />

          {/* Header */}
          <div className="flex justify-between items-center mb-6 relative z-10">
            <button
              onClick={onClose}
              aria-label="Close profile sidebar"
              className="text-gray-400 cursor-pointer hover:text-white"
            >
              <X size={22} />
            </button>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center py-3 gap-3 relative z-10">
            <motion.img
              src={avatar}
              className="w-24 h-24 rounded-full mb-4 object-cover"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />

            <h1 className="text-5xl font-extrabold text-white font-sacramento text-center">
              {user.name}
            </h1>

            <p className="text-gray-400 text-center my-3">
              {user.bio || "No bio available"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserProfileSidebar;
