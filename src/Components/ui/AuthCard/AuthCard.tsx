"use client";

import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  maxWidth?: string;
}

const AuthCard: React.FC<AuthCardProps> = ({
  children,
  maxWidth = "max-w-sm",
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center py-6 px-5 bg-[#141414]">
      <div
        className={`
          w-full ${maxWidth}
          flex flex-col space-y-4 p-8 rounded-xl

          bg-[#141414]
          border border-[#262626]
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default AuthCard;
