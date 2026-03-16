"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/redux/store";

import { forgotPassword } from "@/redux/actions/auth.actions";
import { showSuccessToast, showErrorToast } from "@/Components/ui/Toast/Toast";

import {
  ForgotPasswordForm,
  ForgotPasswordErrors,
  validateForgotPasswordForm,
} from "../validators/forgotPassword.validator";

export const useForgotPassword = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { forgotLoading } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<ForgotPasswordForm>({ email: "" });
  const [formErrors, setFormErrors] = useState<ForgotPasswordErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForgotPasswordForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      if (errors.email) showErrorToast(errors.email);
      return;
    }

    try {
      const res = await dispatch(
        forgotPassword({ email: form.email })
      ).unwrap();
      showSuccessToast("OTP sent to your email!");
      router.push(
        `/auth/verify-reset-password-otp?email=${encodeURIComponent(
          form.email
        )}`
      );
    } catch (err: any) {
      showErrorToast(err?.message || "Something went wrong!");
    }
  };

  return {
    form,
    formErrors,
    forgotLoading,
    handleChange,
    handleSubmit,
    goToLogin: () => router.push("/auth/login"),
  };
};
