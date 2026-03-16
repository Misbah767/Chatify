"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { resetPassword } from "@/redux/actions/auth.actions";
import { showSuccessToast, showErrorToast } from "@/Components/ui/Toast/Toast";
import {
  ResetPasswordForm,
  ResetPasswordErrors,
  validateResetPasswordForm,
} from "../validators/setnewPassword.validator";

export const useSetNewPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const otp = searchParams.get("otp");

  // Decode email properly
  const email = emailParam ? decodeURIComponent(emailParam) : null;

  const dispatch = useDispatch<AppDispatch>();
  const { resetLoading } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<ResetPasswordErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!email || !otp) {
      showErrorToast("Invalid or expired link.");
      router.replace("/auth/forgot-password");
    }
  }, [email, otp, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const errors = validateResetPasswordForm(form);

    // Check if password and confirmPassword match
    if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    if (!email || !otp) {
      showErrorToast("Missing verification details.");
      return;
    }

    try {
      // Dispatch with both password and confirmPassword
      await dispatch(
        resetPassword({
          email,
          otp,
          password: form.password,
          confirmPassword: form.confirmPassword,
        })
      ).unwrap();

      showSuccessToast("Password reset successfully!");
      router.replace("/auth/login");
    } catch (err: any) {
      const msg = err?.message || err || "Failed to reset password!";
      showErrorToast(msg);
    }
  };

  return {
    form,
    formErrors,
    showPassword,
    showConfirm,
    resetLoading,
    handleChange,
    handleSubmit,
    setShowPassword,
    setShowConfirm,
  };
};
