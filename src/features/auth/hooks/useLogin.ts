"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

import { login } from "@/redux/actions/auth.actions";
import { clearError } from "@/redux/slices/auth.slice";
import {
  validateLoginForm,
  LoginForm,
  LoginFormErrors,
} from "../validators/login.validator";

import { showSuccessToast, showErrorToast } from "@/Components/ui/Toast/Toast";

export const useLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { loginLoading, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: undefined });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateLoginForm(form);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const result = await dispatch(login(form));
      if (login.fulfilled.match(result)) {
        showSuccessToast("Logged in successfully!");
        router.push("/chats"); // redirect after login
      } else {
        showErrorToast(
          result.payload && typeof result.payload === "string"
            ? result.payload
            : "Invalid credentials"
        );
      }
    } catch (err: any) {
      showErrorToast(err?.message || "Something went wrong!");
    }
  };

  return {
    form,
    formErrors,
    showPassword,
    loginLoading,
    error,
    handleChange,
    handleSubmit,
    setShowPassword,
    goToForgot: () => router.push("/auth/forgot-password"),
    goToRegister: () => router.push("/auth/register"),
  };
};
