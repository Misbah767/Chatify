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
      "w-full rounded-md bg-[#0a0a0a] px-3 py-2 text-sm text-gray-200 placeholder-gray-400 transition-all duration-200 ease-in-out focus:outline-none";

    const paddingClasses = `${LeftIcon ? "pl-10" : ""} ${
      RightIcon ? "pr-10" : ""
    }`;

    const borderClasses = error
      ? "border-1 border-red-400 focus:border-red-600 focus:ring-1 focus:ring-red-500"
      : "border border-gray-600 focus:border-blue-400 focus:ring-1 focus:ring-[#2b6fb2]";

    const inputClassName = `${baseClasses} ${paddingClasses} ${borderClasses} ${className}`;

    // handleChange wrapper if setValue is provided
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (setValue) setValue(e.target.value);
      if (props.onChange) props.onChange(e);
    };

    return (
      <div className="w-full">
        <div className="relative">
          {LeftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
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
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              <RightIcon size={18} />
            </button>
          )}
        </div>
        <p className="h-5 mt-1 text-xs text-red-400 font-medium">
          {error ? error : "\u00A0"}
        </p>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
