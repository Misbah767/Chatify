"use client";

import React from "react";
import { SyncLoader } from "react-spinners";

type ButtonVariant = "filled" | "outlined" | "destructive";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  isLoading = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 " +
    "flex items-center justify-center gap-2 focus:outline-none";

  const variantStyles =
    variant === "filled"
      ? "bg-[#4a5df9] text-white hover:bg-[#3846b5] active:bg-[#2e3aa8] disabled:bg-blue-400 disabled:cursor-not-allowed"
      : variant === "outlined"
      ? "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-60 disabled:cursor-not-allowed"
      : "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 disabled:bg-red-400 disabled:cursor-not-allowed";

  const buttonClassName = [baseStyles, variantStyles, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={buttonClassName}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <span>Please wait</span>
          <SyncLoader
            size={8}
            color={variant === "outlined" ? "#3b82f6" : "#fff"}
            speedMultiplier={1}
          />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
