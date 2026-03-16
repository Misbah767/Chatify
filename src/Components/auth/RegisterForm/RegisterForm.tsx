"use client";

import React from "react";
import Input from "@/Components/ui/Input/Input";
import Button from "@/Components/ui/Button/Button";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useRegister } from "@/features/auth/hooks/useRegister";

const RegisterForm: React.FC = () => {
  const {
    form,
    localErrors,
    registerLoading,
    handleChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useRegister();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      {/* ================= Grid Layout: 2 columns ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Full Name */}
        <Input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          leftIcon={FiUser}
          error={localErrors.name}
          className="w-full"
        />

        {/* Email */}
        <Input
          name="email"
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          leftIcon={FiMail}
          error={localErrors.email}
          className="w-full"
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
          error={localErrors.password}
          className="w-full"
        />

        {/* Confirm Password */}
        <Input
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          leftIcon={FiLock}
          rightIcon={showConfirmPassword ? FiEyeOff : FiEye}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          error={localErrors.confirmPassword}
          className="w-full"
        />
      </div>

      {/* ================= Submit Button ================= */}
      <Button type="submit" isLoading={registerLoading} className="w-full mt-4">
        {registerLoading ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
};

export default RegisterForm;
