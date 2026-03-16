"use client";

import Input from "@/Components/ui/Input/Input";
import Button from "@/Components/ui/Button/Button";
import { AiOutlineMail } from "react-icons/ai";

import { useForgotPassword } from "@/features/auth/hooks/useForgotPassword";

const ForgotPasswordForm = () => {
  const {
    form,
    formErrors,
    forgotLoading,
    handleChange,
    handleSubmit,
    goToLogin,
  } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-1">
      <Input
        name="email"
        type="email"
        placeholder="Enter your email address"
        value={form.email}
        onChange={handleChange}
        leftIcon={AiOutlineMail}
        error={formErrors.email}
      />

      <Button type="submit" isLoading={forgotLoading} className="w-full">
        {forgotLoading ? "Sending..." : "Send reset OTP"}
      </Button>

      <p className="text-sm text-gray-400 mt-3 text-center">
        Remembered your password?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={goToLogin}
        >
          Login
        </span>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
