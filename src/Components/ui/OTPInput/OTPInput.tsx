"use client";
import React, { useRef } from "react";

interface OTPInputProps {
  length?: number;
  value: string[];
  onChange: (otp: string[]) => void;
  error?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  value,
  onChange,
  error,
}) => {
  //  Each element can be HTMLInputElement or null
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, ""); // only digits
    if (!digit) return;

    const newOtp = [...value];
    newOtp[index] = digit;
    onChange(newOtp);

    // Focus next input if exists
    if (index < length - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.key === "Backspace") {
      const newOtp = [...value];
      newOtp[i] = "";
      onChange(newOtp);
      if (i > 0) inputRefs.current[i - 1]?.focus();
    } else if (e.key === "ArrowLeft" && i > 0) {
      inputRefs.current[i - 1]?.focus();
    } else if (e.key === "ArrowRight" && i < length - 1) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim();
    if (/^\d+$/.test(pasted)) {
      const pastedDigits = pasted.slice(0, length).split("");
      const newOtp = [...value];
      for (let i = 0; i < pastedDigits.length; i++) {
        newOtp[i] = pastedDigits[i];
      }
      onChange(newOtp);
      inputRefs.current[Math.min(pastedDigits.length, length - 1)]?.focus();
    }
  };

  return (
    <div className="flex justify-between" onPaste={handlePaste}>
      {value.map((digit, index) => (
        <input
          key={index}
          // Explicitly type el as HTMLInputElement | null
          ref={(el: HTMLInputElement | null) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={`w-12 h-12 text-center rounded-lg text-white text-xl bg-gray-700 outline-none ${
            error && digit === ""
              ? "border border-red-500"
              : "border border-gray-600 focus:border-blue-500"
          }`}
        />
      ))}
    </div>
  );
};

export default OTPInput;
