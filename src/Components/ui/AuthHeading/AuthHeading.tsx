"use client";

import React from "react";

interface AuthHeadingProps {
  title?: string; // Main brand heading
  secondaryTitle?: string; // Optional second heading
  subtitle?: string; // Optional subtitle
}

const AuthHeading: React.FC<AuthHeadingProps> = ({
  title = "Chatify", //  default changed to Chatify
  secondaryTitle,
  subtitle,
}) => {
  return (
    <div className="space-y-3 text-center">
      {/* Main Heading */}
      <h1 className="text-5xl font-extrabold text-white font-sacramento">
        {title}
      </h1>

      {/* Optional Second Heading */}
      {secondaryTitle && (
        <h2 className="text-3xl font-semibold my-5 mb-5 text-white font-[cursive]">
          {secondaryTitle}
        </h2>
      )}

      {/* Optional Subtitle */}
      {subtitle && <p className="text-sm text-gray-400 my-1">{subtitle}</p>}
    </div>
  );
};

export default AuthHeading;
