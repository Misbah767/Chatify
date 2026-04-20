"use client";

import React, { forwardRef } from "react";
import { IconType } from "react-icons";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  onRightIconClick?: () => void;
  value?: string;
  setValue?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      onRightIconClick,
      className = "",
      value,
      setValue,
      placeholder,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "w-full rounded-lg px-3 py-2 text-sm transition-all duration-200 focus:outline-none";

    const paddingClasses = `${LeftIcon ? "pl-10" : ""} ${
      RightIcon ? "pr-10" : ""
    }`;

    const colorClasses = `
      bg-[#141414]
      text-[#FFFFFF]
      placeholder-[#999999]
    `;

    const borderClasses = error
      ? "border border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
      : "border border-[#262626]";

    const inputClassName = `${baseClasses} ${paddingClasses} ${colorClasses} ${borderClasses} ${className}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) setValue(e.target.value);
      if (props.onChange) props.onChange(e);
    };

    return (
      <div className="w-full">
        <div className="relative group">
          {LeftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999999] transition">
              <LeftIcon size={18} />
            </span>
          )}

          <input
            ref={ref}
            placeholder={placeholder}
            className={inputClassName}
            value={value}
            onChange={handleChange}
            {...props}
          />

          {RightIcon && (
            <button
              type="button"
              onClick={onRightIconClick}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#703BF7] transition"
            >
              <RightIcon size={18} />
            </button>
          )}
        </div>

        <p className="h-5 mt-1 text-xs text-red-500 font-medium">
          {error ? error : "\u00A0"}
        </p>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
