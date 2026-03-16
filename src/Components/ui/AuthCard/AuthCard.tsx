"use client";

import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  /** Tailwind max-width class (optional) */
  maxWidth?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  children,
  maxWidth = "max-w-sm",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center py-6 px-5">
      <div
        className={`w-full ${maxWidth} flex flex-col border-2 border-[#363636] bg-[#0a0a0a] p-8 shadow-lg space-y-4 rounded-xl`}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
