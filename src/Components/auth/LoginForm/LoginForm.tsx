"use client";

import Input from "@/Components/ui/Input/Input";
import Button from "@/Components/ui/Button/Button";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin } from "@/features/auth/hooks/useLogin";

const LoginForm = () => {
  const {
    form,
    formErrors,
    showPassword,
    setShowPassword,
    loginLoading,
    error,
    handleChange,
    handleSubmit,
    goToForgot,
    goToRegister,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      {/* Email */}
      <Input
        name="email"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={handleChange}
        leftIcon={FiMail}
        error={formErrors.email}
      />

      {/* Password */}
      <Input
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        leftIcon={FiLock}
        rightIcon={showPassword ? FiEyeOff : FiEye}
        onRightIconClick={() => setShowPassword(!showPassword)}
        error={
          formErrors.password ?? (typeof error === "string" ? error : undefined)
        }
      />

      {/* Forgot Password */}
      <p
        className="text-sm text-blue-500 cursor-pointer hover:underline text-right"
        onClick={goToForgot}
      >
        Forgot password?
      </p>

      {/* Submit Button */}
      <Button type="submit" isLoading={loginLoading} className="w-full">
        {loginLoading ? "Logging in..." : "Log in"}
      </Button>

      {/* Sign Up link */}
      <p className="text-sm text-gray-400 text-center">
        Don&apos;t have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={goToRegister}
        >
          Sign up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
