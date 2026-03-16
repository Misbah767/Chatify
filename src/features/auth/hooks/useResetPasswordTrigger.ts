"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { showSuccessToast, showErrorToast } from "@/Components/ui/Toast/Toast";

export const useResetPasswordTrigger = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");

  useEffect(() => {
    if (!email || !otp) {
      showErrorToast("Invalid or expired reset link.");
      router.replace("/auth/forgot-password");
    }
  }, [email, otp, router]);

  const handleResetPassword = () => {
    if (!email || !otp) {
      showErrorToast("Missing verification details.");
      return;
    }

    showSuccessToast("Please set a new password now.");
    router.replace(
      `/auth/set-new-password?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`
    );
  };

  return { handleResetPassword };
};
