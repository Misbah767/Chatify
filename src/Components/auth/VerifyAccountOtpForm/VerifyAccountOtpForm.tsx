"use client";

import Button from "@/Components/ui/Button/Button";
import OTPInput from "@/Components/ui/OTPInput/OTPInput";
import { useVerifyAccountOtp } from "@/features/auth/hooks/useVerifyAccountOtp";

const VerifyAccountOtpForm = () => {
  const {
    email,
    otp,
    setOtp,
    validationError,
    setValidationError,
    resendTimer,
    verifyOtpLoading,
    resendOtpLoading,
    isRedirecting,
    handleSubmit,
    handleResendOtp,
  } = useVerifyAccountOtp();

  return (
    <div className="w-full max-w-md mx-auto">
      <p className="text-sm text-gray-400 text-center mb-2">
        Enter the 6-digit OTP sent to your email
      </p>

      {email && (
        <p className="text-sm text-gray-400 text-center mb-4">
          OTP sent to <span className="text-blue-500">{email}</span>
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <OTPInput
          length={6}
          value={otp}
          onChange={(val) => {
            setOtp(val);
            setValidationError("");
          }}
          error={validationError}
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
          Didn’t receive OTP?
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
            {resendOtpLoading
              ? "Please wait..."
              : resendTimer > 0
              ? `Resend (${resendTimer}s)`
              : "Resend OTP"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default VerifyAccountOtpForm;
