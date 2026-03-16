"use client";

import { useEffect } from "react";
import Button from "@/Components/ui/Button/Button";
import OTPInput from "@/Components/ui/OTPInput/OTPInput";
import { useVerifyResetOtp } from "@/features/auth/hooks/useVerifyResetOtp";

const VerifyResetOtpForm = () => {
  const {
    email,
    otp,
    setOtp,
    validationError,
    setValidationError,
    resendTimer,
    verifyOtpLoading,
    resendOtpLoading,
    handleSubmit,
    handleResendOtp,
    isRedirecting,
  } = useVerifyResetOtp();

  // Clear validation error when all inputs are filled
  useEffect(() => {
    if (otp.every((digit) => digit.trim() !== "") && validationError) {
      setValidationError("");
    }
  }, [otp, validationError, setValidationError]);

  return (
    <>
      <p className="text-sm text-gray-400 text-center">
        Enter the 6-digit OTP sent to your email
      </p>

      {email && (
        <p className="text-sm text-gray-400 text-center">
          OTP sent to <span className="text-blue-500">{email}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <OTPInput
          length={otp.length}
          value={otp}
          onChange={setOtp}
          error={validationError} // only UI validation error
        />

        <p className="text-red-500 text-center text-xs h-4">
          {validationError || " "}
        </p>

        <Button
          type="submit"
          isLoading={verifyOtpLoading || isRedirecting}
          className="w-full"
        >
          Verify OTP
        </Button>

        <p className="text-center text-gray-400 text-sm">
          Didn’t get OTP?
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || resendOtpLoading}
            className={`ml-2 ${
              resendTimer > 0 || resendOtpLoading
                ? "text-gray-500 cursor-not-allowed"
                : "text-blue-500 hover:underline"
            }`}
          >
            {resendTimer > 0 ? `Resend (${resendTimer}s)` : "Resend OTP"}
          </button>
        </p>
      </form>
    </>
  );
};

export default VerifyResetOtpForm;
