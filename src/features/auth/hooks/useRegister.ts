"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";

import { register } from "@/redux/actions/auth.actions";
import { clearError } from "@/redux/slices/auth.slice";
import {
  RegisterForm as RegisterFormType,
  FormErrors,
  validateRegisterForm,
} from "../validators/register.validator";

import { showSuccessToast, showErrorToast } from "@/Components/ui/Toast/Toast";

export const useRegister = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { registerLoading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Form state
  const [form, setForm] = useState<RegisterFormType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Local validation errors
  const [localErrors, setLocalErrors] = useState<FormErrors>({});

  // Show/hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(clearError());
    setForm({ ...form, [e.target.name]: e.target.value });
    setLocalErrors({ ...localErrors, [e.target.name]: undefined });
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form locally first
    const errors = validateRegisterForm(form);
    if (Object.keys(errors).length > 0) {
      setLocalErrors(errors);
      return;
    }

    try {
      const result = await dispatch(register(form)).unwrap();
      showSuccessToast(result.message || "Account created successfully!");

      router.push(
        `/auth/verify-account-otp?email=${encodeURIComponent(form.email)}`
      );
    } catch (err: any) {
      showErrorToast(error || "Registration failed!");
    }
  };

  return {
    form,
    localErrors,
    registerLoading,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  };
};
