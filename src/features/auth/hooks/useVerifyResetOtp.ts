"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

import { verifyResetOtp, resendResetOtp } from "@/redux/actions/auth.actions";
import { showSuccessToast, showErrorToast } from "@/Components/ui/Toast/Toast";
import { validateOtp, OTP_LENGTH } from "../validators/otp.validator";

const RESEND_INTERVAL = 60;

export const useVerifyResetOtp = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const dispatch = useDispatch<AppDispatch>();
  const { verifyOtpLoading, resendOtpLoading } = useSelector(
    (state: RootState) => state.auth
  );

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [validationError, setValidationError] = useState("");
  const [resendTimer, setResendTimer] = useState(RESEND_INTERVAL);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Guard: email missing
  useEffect(() => {
    if (!email) {
      showErrorToast("Email missing!");
      router.replace("/auth/forgot-password");
    }
  }, [email, router]);

  // Resend timer
  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const { isValid, error } = validateOtp(otp);
    if (!isValid) {
      setValidationError(error || "");
      return;
    }

    setValidationError("");

    try {
      const otpValue = otp.join("");
      await dispatch(verifyResetOtp({ email, otp: otpValue })).unwrap();

      setIsRedirecting(true);
      showSuccessToast("OTP verified successfully!");
      router.replace(
        `/auth/reset-password-trigger?email=${encodeURIComponent(
          email
        )}&otp=${encodeURIComponent(otpValue)}`
      );
    } catch (err: any) {
      showErrorToast(err || "OTP verification failed!");
    }
  };

  const handleResendOtp = async () => {
    if (!email || resendTimer > 0) return;

    try {
      await dispatch(resendResetOtp({ email })).unwrap();
      showSuccessToast("OTP resent successfully!");
      setResendTimer(RESEND_INTERVAL);
    } catch (err: any) {
      showErrorToast(err || "Failed to resend OTP!");
    }
  };

  return {
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
  };
};
